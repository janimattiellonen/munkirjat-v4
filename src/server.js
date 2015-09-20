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

server.get('/author/:id', function(req, res) {
    prepare(req, res, authorService, function(result) {

        if (!result) {
            return null;
        }

        let author = {};

        result.map(row => {
            if (null == author.id) {
                author.id = row['id'];
                author.firstname = row['firstname'];
                author.lastname = row['lastname'];
                author.name = row['name'];
            }

            if (null == author.books) {
                author.books = [];
            }

            author.books.push({
                id: row['book_id'],
                title: row['title'],
                is_read: row['is_read'],
            });
        });
        
        return author;
        
    });
    
    authorService.getAuthor(req.params.id);

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

    connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {

            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }

            return txt;
        }.bind(this));
    };


    connection.connect();

    return connection;
}

function prepare(req, res, service, resultDataProcessor = null) {
    let connection = getConnection();

    service.prepare(connection, function(err, result) {

        if (null !== resultDataProcessor) {
            console.log("has resultDataProcessor...");
            result = resultDataProcessor(result);
        }

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
