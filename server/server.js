require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname , '../public')))

// Configuración global de rutas
app.use(require('./routes/index'))


// mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos ONLINE');
// });

let connect = async() => {
    try {
        const resBase = await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        const respuesta = resBase.connection
            // console.log(respuesta);
        console.log('Base de datos ONLINE!');
    } catch (error) {
        console.log(error);
    }
}

connect();

app.listen(process.env.PORT, () => {
    console.log('escuchando en el puerto', process.env.PORT);
})