var config 	= require('./config');
var restify = require('restify');
var http 	= require('follow-redirects').http;
var uuid 	= require('node-uuid');
var server 	= restify.createServer();
var mysql 	= require('mysql');
var AuthorService = require('./components/service/AuthorService');
var BookService = require('./components/service/BookService');

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

let authorService = new AuthorService();
let bookService = new BookService();

server.get('/books/:mode', function (req, res) {

   prepare(req, res, bookService);

    let mode = req.params.mode;

    if (mode == 'read') {
        bookService.getReadBooks();
    } else if (mode == 'unread') {
        bookService.getUnreadBooks();
    } else {
        bookService.getAllBooks();
    }
});

server.get('/authors', function(req, res) {
    prepare(req, res, authorService)

    authorService.getAllAuthors();
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

function prepare(req, res, service) {
    let connection = getConnection();

    service.prepare(connection, function(err, result) {
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
}

function prepare_nonworking(connection, req, res) {

    return function(err, result) {
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    };
}


server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});


export default server;
