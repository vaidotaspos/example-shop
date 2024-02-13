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
    }
}
