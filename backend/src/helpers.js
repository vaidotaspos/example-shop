const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const {dbConfig, jwtSecret} = require('./config');

async function makeSqlQuery(sql, argArr = []) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(sql, argArr);
        return [rows, null];
    } catch (error) {
        return [null, error];
    } finally {
        if (connection) connection.end();
    }
}

function makeJWTToken(data, expires = '1h') {
    if (!jwtSecret) throw new Error('no secret provided');

    return jwt.sign(data, jwtSecret, {expiresIn: expires});
}

function parseJWTToken(token) {
    if (!jwtSecret) throw new Error('no secret provided');

    return jwt.decode(token);
}

module.exports = {
    makeSqlQuery,
    makeJWTToken,
    parseJWTToken,
};
