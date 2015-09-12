var config 	= require('./config');
var restify = require('restify');
var http 	= require('follow-redirects').http;
var uuid 	= require('node-uuid');
var server 	= restify.createServer();
var mysql 	= require('mysql');
var BookService = require('./components/service/BookService');

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

let bookService = new BookService(mysql);

server.get('/books', function (req, res) {
    prepare(req, res);

    bookService.getAllBooks();
});

server.get('/books/:mode', function (req, res) {

    prepare(req, res);

    let mode = req.params.mode;
    
    if (mode == 'read') {
        bookService.getReadBooks();
    } else {
        bookService.getUnreadBooks();
    }
});

function getConnection() {
    var connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    connection.connect();

    return connection;
}

function prepare(req, res) {
    let connection = getConnection();

    bookService.prepare(connection, function(err, result) {
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
}


server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});




export default server;
