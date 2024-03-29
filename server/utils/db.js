const mysql = require('mysql2')
const config = require('../config')

const connection = mysql.createConnection({
    host: config.HOST,
    port: config.DBPORT,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNAME,
    multipleStatements: true
})

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения к БД! ' + error);
    } else {
        return console.log('Подлючение успешно!');
    }
})

module.exports = connection