const express = require('express');
const mysql = require('mysql');
const faker = require('faker');

/**
 * Config faker generator.
 *
 * @type {string}
 */
faker.locale = "pt_BR";

/**
 * Mysql
 * @type {{password: string, database: string, host: string, user: string}}
 */
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

let connection = mysql.createConnection(config);

for (let i = 0; i < 20; i++) {
    let sql = `INSERT INTO people(name) VALUES ('${faker.name.findName()}')`;
    connection.query(sql);
}

connection.end();

/**
 * App com express
 *
 */
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", (req, res) => {
    let connection = mysql.createConnection(config);
    let sql = `SELECT name FROM people`;

    connection.query(sql, (err, peoples, fields)  => {
        if (err) {
            console.log(err);
            res.render('error', { title: 'FullCycle 2.0', message: 'Ops!'});
            return;
        }
        res.render('index', {
            title: 'FullCycle 2.0',
            message: 'Full Cycle Rocks!',
            names: peoples.map(people => people.name)
        });
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
