var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var locations = require('./routes/locations');
var events = require('./routes/events');
var interactions = require('./routes/interactions');
var reports = require('./routes/reports');

var env = null;
//var env = 'development';

// connects to mongodb
var mongoose = require('mongoose');
var mongo;

//if (env === 'development') {
//  mongo = 'mongodb://localhost/test';
//  mongoose.connect(mongo);
//} else {
mongo = 'mongodb://brenosouza:cefetmglogsense@kahana.mongohq.com:10045/app30139807/test';
mongoose.connect(mongo);
//}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection'));
db.once('open', function callback () {
  console.log('mongoose connection [Opened: connected to [' + mongo + ']]');
});

var app = express();

app.set('env', env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/locations', locations);
app.use('/events', events);
app.use('/interactions', interactions);
app.use('/reports', reports);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
