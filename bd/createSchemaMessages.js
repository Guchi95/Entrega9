const { Sqlite3 } = require('./Sqlite3.js')
const knex = require('knex')(Sqlite3);
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../Ecommerce.sqlite', sqlite3.OPEN_READWRITE, (err) => {
if (err) return console.error(err.message);
console.log('Connection successful');
});

const create = knex.schema.createTable('messages', table => {
    table.string('email')
    table.string('msg')   
    table.date('date') 
}).then(() => console.log('Table Created'))
.catch((err) => { console.log(err); throw err }); 

