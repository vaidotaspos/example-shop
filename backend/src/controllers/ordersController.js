const APIError = require('../apiError/ApiError');
const {makeSqlQuery, parseJWTToken} = require('../helpers');

module.exports = {
    create: async (req, res, next) => {
        const {item_id, customer_id, quantity} = req.body;

        let sql = 'SELECT `stock`, `price` FROM `items` WHERE `id` = ?';
        const [itemResponseObject, sqlError] = await makeSqlQuery(sql, [item_id]);

        if (sqlError) {
            return next(sqlError);
        }

        if (itemResponseObject.length === 0) {
            return next(new APIError('Item not found', 404));
        }

        const itemStock = itemResponseObject[0].stock;
        if (quantity > itemStock) {
            return next(new APIError('Item stock is too low', 400));
        }

        const itemPrice = itemResponseObject[0].price;
        const orderTotal = itemPrice * quantity;

        sql = 'INSERT INTO `orders` (`item_id`, `customer_id`, `qty`, `price`, `total`) VALUES (?, ?, ?, ?, ?)';

        const [responseObject, error] = await makeSqlQuery(sql, [
            item_id,
            customer_id,
            quantity,
            itemPrice,
            orderTotal
        ]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        sql = 'UPDATE `items` SET `stock` = `stock` - ? WHERE `id` = ?' ;
        const [responseObjectItem, errorItem] = await makeSqlQuery(sql, [quantity, item_id]);
        if (errorItem) {
            return next(errorItem);
        }

        if (responseObjectItem.affectedRows !== 1) {
            sql = 'DELETE FROM `orders` WHERE `id` = ?';
            const [responseObjectOrderDelete, errorOrderDelete] = await makeSqlQuery(sql, [responseObject.insertId]);
            if (errorOrderDelete) {
                return next(errorOrderDelete);
            }

            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: responseObject.insertId,
            message: `Order created successfully`,
        });
    },
    getSingle: async (req, res, next) => {
        const {id} = req.params
        const tokenData = parseJWTToken(req.header('Authorization'));

        let sqlArguments = [id];

        let sql = 'SELECT `orders`.*, ' +
            '`customers`.`firstname` as `customer_firstname`, `customers`.`lastname` as `customer_lastname`, `customers`.`email` as `customer_email`, ' +
            '`items`.`title` as `item_title`, `items`.`img_url` as `item_img` ' +
            'FROM `orders` ' +
            'JOIN `customers` ON `customers`.`id` = `orders`.`customer_id` ' +
            'JOIN `items` ON `items`.`id` = `orders`.`item_id` ' +
            'WHERE `orders`.`id` = ?'

        if (tokenData.scope && tokenData.scope !== 'admin') {
            sql += ' AND `orders`.`customer_id` = ?';
            sqlArguments = [
                ...sqlArguments,
                tokenData.userId
            ]
        }

        const [responseObject, error] = await makeSqlQuery(sql, sqlArguments);

        if (error) {
            return next(error);
        }

        if (responseObject.length === 0) {
            return next(new APIError('Order was not found', 404));
        }

        res.json(responseObject[0]);
    },
    getAll: async (req, res, next) => {
        const tokenData = parseJWTToken(req.header('Authorization'));

        let sql = 'SELECT `orders`.`id`, `orders`.`total`, `orders`.`created_at`, CONCAT(`customers`.`firstname`, " ", `customers`.`lastname`) as `customer`  ' +
            'FROM `orders` ' +
            'JOIN `customers` ON `customers`.`id` = `orders`.`customer_id`';

        let sqlArguments = [];
        if (tokenData.scope && tokenData.scope !== 'admin') {
            sql += ' WHERE `orders`.`customer_id` = ?';
            sqlArguments = [
                tokenData.userId
            ]
        }

        const [responseObject, error] = await makeSqlQuery(sql, sqlArguments);

        if (error) {
            return next(error);
        }

        res.json(responseObject);
    },
    delete: async (req, res, next) => {
        const {id} = req.params

        const tokenData = parseJWTToken(req.header('Authorization'));
        if (tokenData.scope && tokenData.scope !== 'admin') {
            return next(new APIError('Access denied!', 401));
        }

        let sql = 'SELECT `item_id`, `qty` FROM `orders` WHERE `id` = ?';

        const [orderResponseObject, sqlError] = await makeSqlQuery(sql, [id]);

        if (sqlError) {
            return next(sqlError);
        }

        if (orderResponseObject.length === 0) {
            return next(new APIError('Order not found', 404));
        }

        sql = 'UPDATE `items` SET `stock` = `stock` + ? WHERE `id` = ?';
        const [itemResponseObject, itemError] = await makeSqlQuery(sql, [
            orderResponseObject[0].qty,
            orderResponseObject[0].item_id,
        ]);

        if (itemError) {
            return next(itemError);
        }

        sql = 'DELETE FROM `orders` WHERE id = ?';

        const [responseObject, error] = await makeSqlQuery(sql, [id]);
        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something went wrong with order delete', 400));
        }

        res.status(200).json({
            id: id,
            message: `Order with id: ${id} deleted successfully`
        });
    }
}
