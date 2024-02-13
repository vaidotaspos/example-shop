const APIError = require('../apiError/ApiError');
const {makeSqlQuery, parseJWTToken} = require('../helpers');

module.exports = {
    create: async (req, res, next) => {
        const {item_id, customer_id, quantity} = req.body;

        const itemSql = 'SELECT `price` FROM `items` WHERE `id` = ?';
        const [itemResponseObject, sqlError] = await makeSqlQuery(itemSql, [item_id]);
        if (itemResponseObject.length === 0) {
            return next(new APIError('Item not found', 404));
        }

        const itemPrice = itemResponseObject[0].price;
        const orderTotal = itemPrice * quantity;

        const sql = 'INSERT INTO `orders` (`item_id`, `customer_id`, `qty`, `price`, `total`) VALUES (?, ?, ?, ?, ?)';

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

        const sql = 'DELETE FROM `orders` WHERE id = ?';

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
