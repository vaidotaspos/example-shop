const APIError = require('../apiError/ApiError');
const {makeSqlQuery} = require('../helpers');

module.exports = {
    getAll: async (req, res, next) => {
        const sql = 'SELECT * FROM `categories`';

        const [catsArr, error] = await makeSqlQuery(sql);

        if (error) {
            return next(error);
        }

        res.json(catsArr);
    },
    single: async (req, res, next) => {
        const {id} = req.params;

        const sql = "SELECT * FROM `categories` WHERE `id` = ?"

        const [responseObject, error] = await makeSqlQuery(sql, [id])

        if (error) {
            return next(error);
        }

        if (responseObject.length === 0) {
            return next(new APIError('Categories was not found', 404));
        }

        res.json(responseObject[0]);
    },
    update: async (req, res, next) => {
        const {id} = req.params;
        const {name} = req.body;

        const sql = 'UPDATE `categories` SET `name` = ? WHERE `id` = ?';

        const [responseObject, error] = await makeSqlQuery(sql, [name, id]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something wrong with categories edit', 400))
        }

        res.status(200).json({
            id: id,
            message: `Category with id: ${id} updated successfully`
        });
    },
    create: async (req, res, next) => {
        const {name} = req.body;

        const sql = 'INSERT INTO `categories` (`name`) VALUES (?)';

        const [responseObject, error] = await makeSqlQuery(sql, [name]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something wrong with categories creation', 400))
        }

        res.status(201).json({
            id: responseObject.insertId,
            message: 'Category created successfully!'
        });
    },
    delete: async (req, res, next) => {
        const {id} = req.params;

        const sql = 'DELETE FROM `categories` WHERE id=?';

        const [responseObject, error] = await makeSqlQuery(sql, [id]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something wrong with category delete', 400))
        }

        res.status(200).json({
            message: 'Category deleted successfully!'
        });
    }
};
