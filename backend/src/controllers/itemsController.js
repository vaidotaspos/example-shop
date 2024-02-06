const APIError = require('../apiError/ApiError');
const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    // sukuriam sql
    const sql = 'SELECT * FROM `items`';

    // makeSqlQuery
    const [itemsArr, error] = await makeSqlQuery(sql);

    // graznam klaida
    if (error) {
      console.log('getAll items error ===');
      return next(error);
    }

    // arba items

    res.json(itemsArr);
  },
  getSingle: async (req, res, next) => {
    const { itemId } = req.params;
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
  create: async (req, res, next) => {
    const { title, description, price, rating, stock, cat_id, img_url } = req.body;

    const argArr = [title, description, price, rating, stock, cat_id, img_url];
    const sql = `INSERT INTO items (title, description, price, rating, stock, cat_id, img_url) 
    VALUES (?,?,?,?,?,?,?)`;

    const [resObj, error] = await makeSqlQuery(sql, argArr);

    if (error) {
      console.log(' create item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('create item no rows affected', resObj);
      return next(new APIError('something went wrong', 400));
    }

    res.status(201).json({
      id: resObj.insertId,
      msg: 'success',
    });
  },
  delete: async (req, res, next) => {
    const { itemId } = req.params;
    // sukuriam sql
    const sql = 'UPDATE `items` SET isDeleted=1 WHERE id=? LIMIT 1';

    const [resObj, error] = await makeSqlQuery(sql, [itemId]);
    console.log('resObj ===', resObj);
    if (error) {
      console.log(' delete item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      // changedRows
      console.log('delete item no rows affected', resObj);
      return next(new APIError('something went wrong', 400));
    }

    res.status(200).json({
      msg: 'success',
    });
  },
};
