const express = require('express');
const Persistance = require('./persistance');
const { Router } = express
const persistance = new Persistance.Persistance();
const router = Router()
const { engine } = require('express-handlebars');
const app = express();
const { Server } = require('socket.io');
var fs = require('fs');

const PORT = 8080
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'index',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);

app.set('view engine', 'hbs');


const server = app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

//-----------------------------------------------------------------------------------------------------//


app.use('/api', router);

app.get('/productos', (req, res) => {
    res.render('./partials/listproductos', { layout: 'index', productos: persistance.getProductos()})
});

app.get('/', (req, res) => {
    persistance.getProductos().then(result => {
        res.render("AgregarProducto", {
            productos: result
        });
    })
    
})

router.get('/productos', (req, res) => {
    res.send(persistance.getProductos())
})
 
router.post('/productos', (req, res) => {
    var productoToAdd = req.body;
    var id = persistance.addProducto(productoToAdd);
    productoToAdd.id = id;
    io.emit('table', productoToAdd);
    res.send({ id: id })

}) 

router.get('/productos/:id', (req, res) => {
    var productId = req.params.id;

    if (persistance.productoExiste(productId)) {
        res.send(persistance.getProducto(productId))
    } else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }

})

router.delete('/productos/:id', (req, res) => {
    var productId = req.params.id;
    if (persistance.productoExiste(productId)) {
        persistance.deleteProducto(productId);
        res.send()

    } else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }


})

router.put('/productos/:id', (req, res) => {
    var productId = req.params.id;
    var productoToModify = req.body;
    if (persistance.productoExiste(productId)) {
        persistance.putProducto(productoToModify, productId);
        res.send()

    } else {
        res.status(404);
        res.send({ error: 'producto no encontrado' });
    }

})
//------------------------------CHAT--------------------------------------------------//

const { Sqlite3 } = require('./bd/Sqlite3.js'); 
const knex = require('knex')(Sqlite3);

router.post('/chat', (req, res) => {
    try {
        knex('messages').insert(req.body)
        .then(() => console.log('Data Inserted'))
        .catch((err) => { console.log(err); throw err})
        } catch (err) {
        console.log("No se pudo guardar mensaje por el motivo " + JSON.stringify(err));
    }
    res.send()

})

//------------------------------FAKER--------------------------------------------------//
const faker = require('@faker-js/faker/locale/es')
const {name, internet, random } = faker

router.post('/productos-test', (req, res) => {
    try {
        let str = 'TITLE;PRICE;THUMBNAIL'

        for (let i = 0; i > 5; i++) {   
            str += name.firstName() +
            ';' + internet.email() +
            ';' + random.locale() +
            '\n'
        }
        console.log(str);
        /*  knex('products').insert(str)
        .then(() => console.log('Data Inserted'))
        .catch((err) => { console.log(err); throw err}) */
        } catch (err) {
        console.log("No se pudo guardar el producto por el motivo " + JSON.stringify(err));
    }
    res.send()
})




