const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // * middleware for logger
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const indexRouter = require('./routes/index');

const app = express();

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Web Spiders Test API Setup",
            version: "1.0.0",
            description: "List of API's used in the project",
            license: {
                name: "MIT",
            },
            contact: {
                name: "Nidhin Thomas",
                email: "nidhinthomas5@gmail.com"
            }
        },
        servers: [{
            url: "http://localhost:3000",
            description: "Local Server"
        }]
    },
    apis: ['./routes/*.js', './models/*.js'],
};
const swaggerSpecs = swaggerJsdoc(options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet()); // * prevent web vulnarabilities
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;