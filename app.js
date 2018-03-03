/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load employees route
var employees = require('./routes/employees');
var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');

// view engine setup
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//MySql Connection
app.use(

    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'eban',
        port : 3306,
        database:'nodejs'
    },'request')

);

//route index
app.get('/', routes.index);

//route employee list
app.get('/employees', employees.list);

//route add employee, get n post
app.get('/employees/add', employees.add);
app.post('/employees/add', employees.save);

//route delete employee
app.get('/employees/delete/:id', employees.delete_employee);

//edit employee route , get n post
app.get('/employees/edit/:id', employees.edit);
app.post('/employees/edit/:id',employees.save_edit);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;