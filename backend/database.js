var mysql = require('mysql2');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const DBConnection = {
    host: process.env.REACT_APP_MYSQL_HOST,
    port: "3306",
    user: process.env.REACT_APP_MYSQL_USER,
    password: process.env.REACT_APP_MYSQL_PASSWORD,
    database: process.env.REACT_APP_MYSQL_DB,
} 

const DBPool = mysql.createPool({
    ...DBConnection, typeCast: function (field, next) {
        if (field.type === "DECIMAL" || field.type === 'NEWDECIMAL') {
            var value = field.string();
            return (value === null) ? '' : Number(value);
        }
        return next();
    }
});

module.exports = DBPool.promise();