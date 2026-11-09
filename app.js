 
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import routers
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const productRoute = require('./routes/product');
const pagesRoute = require('./routes/pages');
const pagesChockout = require('./routes/checkout');

// Configure Handlebars
app.engine(
    'handlebars',
    engine({
        defaultLayout: 'main',
        extname: '.handlebars',
        partialsDir: path.join(__dirname, 'views/partials'),

        helpers: {
            eq: function (a, b) {
                return String(a) === String(b);
            }
        }
    })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//  session 
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));
// Routes
app.use('/', pagesRoute);
app.use('/auth', authRoute);
app.use('/', adminRoute);
app.use('/', productRoute);
app.use('/', pagesChockout);

// Other pages
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
