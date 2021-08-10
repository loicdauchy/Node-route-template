// Require Express
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');


// Require .env var file
require('dotenv').config();

// Call env var PORT
const PORT = process.env.PORT || 3000;

// Declare express on app const
const app = express();

// Handlebars init
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }))


// Use public folder
app.use(express.static(path.resolve(__dirname, './public')));

// Middlewares & Req object
app.use((req, res, next) => {
    const { method, path } = req;
    console.log(`method: ${method} | path: ${path}`);

    next()
})

// Render of index.html view on / Route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
})

//  Render JSON data on /json Route
app.get('/json', (req, res) => {
    // Call env var
    const name = process.env.NAME || 'Loic';
    res.json({
        name
    })
})

//  Get Route params
app.get('/product/:name', (req, res) => {
    // Call env var
    const name = req.params.name;
    res.json({
        name
    })
})

//  Get Route params by post form
app.post('/product', (req, res) => {
    const { name, color } = req.body;
    res.json({
        name,
        color
    })
})

// Get Many Route params for search
app.get('/products', (req, res) => {
    const { color, taille } = req.query;
    res.send(`Couleur : ${color}, Taille : ${taille}`)
})

//  Middlewares
app.get('/hour', (req, res, next) => {
   const hour = new Date().toLocaleTimeString();
   req.hour = hour;

   next();
}, (req, res) => {
    res.render('hour', {
        heure: req.hour
    });
})

// Server Run on port .env PORT or 3000
app.listen(PORT, () => {
    console.log(`Le serveur est bien lancé sur le port : ${PORT}`)
})