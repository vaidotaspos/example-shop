const APIError = require('../apiError/ApiError');
const {makeSqlQuery} = require('../helpers');

module.exports = {
    create: async (req, res, next) => {
        const {item_id, customer_id} = req.body;

        const sql = 'INSERT INTO `orders` (`item_id`, `customer_id`, `qty`, `total`) VALUES (?, ?, ?, ?)';

        const [responseObject, error] = await makeSqlQuery(sql, [
            item_id,
            customer_id,
            1,
            70
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
    }
}
