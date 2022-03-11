var mysql = require('mysql2');

const DBConnection = {
    host: process.env.REACT_APP_DB_HOST,
    port: "3306",
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE,
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