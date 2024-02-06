const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    const sql = 'SELECT * FROM `categories`';

    const [catsArr, error] = await makeSqlQuery(sql);

    if (error) {
      console.log('getAll categories error ===');
      return next(error);
    }

    res.json(catsArr);
  },
};
