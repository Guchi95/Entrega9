const { MariaDB } = require('./bd/MariaDB.js') 
const knex = require('knex')(MariaDB);


class Persistance {
    constructor() {
        this.productos = [];
        this.autoIncrement = 0;
    }


    addProducto(producto) {
        knex('products').insert(producto)
        .then(() => console.log('Data Inserted'))
        .catch((err) => { console.log(err); throw err})
        };

    getProducto(id) {
        var dataArr =[];
        return knex('products').select('*').where('id', id)
           .then(function(result) {
               result.forEach(function(value) {
                  dataArr.push(value)
               });
               return JSON.parse(JSON.stringify(dataArr));
           });
    }

    deleteProducto(id) {

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos.splice(i, 1);
            }
        }

    }

    putProducto(producto, id) {
        this.deleteProducto(id);
        producto.id = id;
        this.productos.push(producto);
    }

    getProductos() {
        var dataArr =[];
        return knex('products').select('*')
           .then(function(result) {
               result.forEach(function(value) {
                  dataArr.push(value)
               });
               return JSON.parse(JSON.stringify(dataArr));
           });
    };
    

    productoExiste(id) {
        var producto = this.getProducto(id)
        return producto != null;

    }

}

module.exports = {
    Persistance: Persistance
}