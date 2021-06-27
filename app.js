const express = require('express');
const app = express();
const morgan = require('morgan'); // logging
const mongoose = require('mongoose'); // connection manager to MongoDB
const checkAuth = require('./api/middlewares/checkAuth');

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
});

const articlesRoutes = require('./api/routes/articles');
const categoriesRoutes = require('./api/routes/categories');
const usersRoutes = require('./api/routes/users');

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept , Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes

app.use('/articles', articlesRoutes);
app.use('/categories', checkAuth, categoriesRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;