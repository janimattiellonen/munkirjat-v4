var config 	= require('./config');
var restify = require('restify');
var http 	= require('follow-redirects').http;
var uuid 	= require('node-uuid');
var server 	= restify.createServer();
var mysql 	= require('mysql');
var AuthorService = require('./components/service/AuthorService');
var BookService = require('./components/service/BookService');
var Immutable = require('immutable');

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

let authorService = new AuthorService();
let bookService = new BookService();

server.get('/book/:id', function(req, res) {
    prepare(req, res, bookService);

    let id = req.params.id;

    bookService.getBook(id);
});

server.get('/books/:mode', function (req, res) {

    prepare(req, res, bookService, function(result) {
        if (!result) {
            return null;
        }

        let books = Immutable.Map();

        result.map(row => {
            let book = books.get(row.id)

            if (!book) {
                book = {
                    id: row.id,
                    title: row.title,
                    language_id: row.language_id,
                    page_count: row.page_count,
                    is_read: row.is_read,
                    isbn: row.isbn,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    started_reading: row.started_reading,
                    finished_reading: row.finished_reading,
                    rating: row.rating,
                    price: row.price,
                    authors: [{
                        firstname: row.firstname,
                        lastname: row.lastname,
                        author_name: row.author_name
                    }]
                };
            } else {
                book.authors.push({
                    firstname: row.firstname,
                    lastname: row.lastname,
                    author_name: row.author_name
                });
            }

            books = books.set(row.id, book);
        });

        return books.toArray();
    });

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
            result = resultDataProcessor(result);
        }
        
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
}

server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});


export default server;
