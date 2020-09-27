var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash-messages');
const session = require('express-session');
var webRoutes = require('./routes/web');
var apiRoutes = require('./routes/api');
// Import the library:
var cors = require('cors');
var app = express();




 // view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
//app.set('view engine', env('template_engine'));  // either pug,twig etc
app.set('view engine', env('template_engine_ejs'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Then use it before your routes are set up:
app.use(cors());
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));
app.use('/', webRoutes);
app.use('/api/v1/', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   res.send('404 page not found');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err);

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;