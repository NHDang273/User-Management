require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

// npm install connect-flash
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5000;

const session = require('express-session');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Template engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'));

// handle 404
app.use((req, res) => {
    res.status(404).send('404: Page not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});