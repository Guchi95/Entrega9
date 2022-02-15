const { MariaDB } = require('./MariaDB.js')
const knex = require('knex')(MariaDB);

knex.schema.createTable('products', table => {
    table.increments('id')
    table.integer('price')
    table.string('thumbnail')   
    table.string('title')
    
})
    .then(() => console.log('Table Created'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });