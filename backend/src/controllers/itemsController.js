const APIError = require('../apiError/ApiError');
const {makeSqlQuery} = require('../helpers');

module.exports = {
    getAll: async (req, res, next) => {
        const sql = 'SELECT `i`.*, `c`.name AS `category_name`, AVG(`ir`.`rating`) AS `average_rating`, COUNT(`ir`.`item_id`) as `rating_count` ' +
            'FROM `items` as `i` ' +
            'LEFT JOIN `categories` AS c ON `i`.`cat_id`  = `c`.`id` ' +
            'LEFT JOIN `item_ratings` AS ir ON `ir`.`item_id`  = `i`.`id` ' +
            'WHERE `i`.`isDeleted` = 0 ' +
            'GROUP BY `i`.`id`';

        const [itemsArr, error] = await makeSqlQuery(sql);

        if (error) {
            return next(error);
        }

        res.json(itemsArr);
    },
    getSingle: async (req, res, next) => {
        const {itemId} = req.params;
        // sukuriam sql
        const sql = 'SELECT * FROM `items` WHERE id=?';

        // makeSqlQuery
        /** @type {[Array, Object]} itemsArr */
        const [itemsArr, error] = await makeSqlQuery(sql, [itemId]);

        // graznam klaida
        if (error) {
            console.log('getAll items error ===');
            return next(error);
        }

        // neradom nei vieno objekto
        if (itemsArr.length === 0) {
            return next(new APIError('Post was not found', 404));
        }

        // arba item

        res.json(itemsArr[0]);
    },
    updateRating: async (req, res, next) => {
        const {itemId} = req.params;

        const {rating} = req.body;

        const sql = 'UPDATE `items` SET `rating` = ? WHERE `id` = ?';
        const [responseObject, error] = await makeSqlQuery(sql, [rating, itemId]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something wrong with item rating update', 400))
        }

        res.status(200).json({
            id: itemId,
            message: `Item with id: ${itemId} rating updated successfully`
        });
    },
    update: async (req, res, next) => {
        const {itemId} = req.params;

        const {title, cat_id, description, price, img_url, rating, stock} = req.body;

        const sql = 'UPDATE `items` ' +
            'SET `title` = ?, `cat_id` = ?, `description` = ?, `price` = ?, `img_url` = ?, `rating` = ?, `stock` = ? ' +
            'WHERE `id` = ?';

        const [responseObject, error] = await makeSqlQuery(sql, [
            title,
            cat_id,
            description,
            price,
            img_url,
            rating,
            stock,
            itemId
        ]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('Something wrong with item edit', 400))
        }

        res.status(200).json({
            id: itemId,
            message: `Item with id: ${itemId} updated successfully`
        });

    },
    create: async (req, res, next) => {
        const {title, description, price, rating, stock, cat_id} = req.body;

        const argArr = [
            title,
            description ?? null,
            price,
            rating ?? 0,
            stock,
            cat_id,
            req?.file?.path || ''
        ];

        const sql = `INSERT INTO items (title, description, price, rating, stock, cat_id, img_url)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [resObj, error] = await makeSqlQuery(sql, argArr);

        if (error) {
            return next(error);
        }

        if (resObj.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: resObj.insertId,
            message: 'Item created successfully!',
        });
    },
    delete: async (req, res, next) => {
        const {itemId} = req.params;
        const sql = 'UPDATE `items` SET isDeleted=1 WHERE id=? LIMIT 1';

        const [resObj, error] = await makeSqlQuery(sql, [itemId]);
        if (error) {
            return next(error);
        }

        if (resObj.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(200).json({
            message: 'Item deleted successfully!',
        });
    },
};
