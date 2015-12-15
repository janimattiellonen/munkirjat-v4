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
    var connection = getConnection();
    bookService.setConnection(connection);

    let id = req.params.id;

    bookService.getBook(id, function(err, result) {
        res.charSet('utf8');
        res.send(200, result);
        connection.end();
    });
});

server.get('/books/:mode', function (req, res) {
    var connection = getConnection();
    bookService.setConnection(connection);

    let mode = req.params.mode;

    bookService.getBooks(mode, function(err, result) {
        if (!result) {
            res.charSet('utf8');
            res.send(200, []);
            connection.end();
            return;
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

        res.charSet('utf8');
        res.send(200, books.toArray());
        connection.end();

    });
});

server.post('/book', function(req, res) {
    var connection = getConnection();
    bookService.setConnection(connection);

    let newBook = {

    };

    console.log("params: " + JSON.stringify(req.params));

    bookService.createBook(req.params, function(err, result) {
        if (err) {
            console.log("Error creating a new book: " + err);
            return;
        }

        let createdBookId   = result.insertId;
        let authors         = [];

        req.params.authors.map(author => {
            authors.push(author.value);
        });

        bookService.addAuthors(createdBookId, authors, function(err, result) {
            if (err) {
                console.log("Error adding authors for book: " + err);
                return;
            }
            
            res.charSet('utf8');
            res.send(200, {"status": "OK", "id": createdBookId});
            connection.end();
        });
    });

});

server.post('/author', function(req, res) {
    var connection = getConnection();
    authorService.setConnection(connection);
    let newAuthor = {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
    };

    authorService.createAuthor(newAuthor, function(err, result) {

        if (err) {
            console.log("Error: " + err);
            return;
        }

        let createdAuthorId = result.insertId;

        authorService.getAuthorWithBooks(createdAuthorId, function(err, result) {
            if (err) {
                console.log("Error2: " + err);
                return;
            }    

            let author = {};

            if (result) {
                author = authorService.createAuthorObject(result);
            }

            res.charSet('utf8');
            res.send(200, author);
            connection.end();
        });
    });
});

server.put('/author/:id', function(req, res) {
    var connection = getConnection();
    authorService.setConnection(connection);

    let updatedAuthor = {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
    };

    let id = req.params.id;

    authorService.updateAuthor(id, updatedAuthor, function(err, result) {

        if (err) {
            console.log("Error: " + err);
            return;
        }

        authorService.getAuthorWithBooks(id, function(err, result) {
            if (err) {
                console.log("Error2: " + err);
                return;
            }    

            let author = {};

            if (result) {
                author = authorService.createAuthorObject(result);
            }

            res.charSet('utf8');
            res.send(200, author);
            connection.end();
        });
    });
});

server.get('/author/:id', function(req, res) {
    var connection = getConnection();
    authorService.setConnection(connection);
    
    authorService.getAuthorWithBooks(req.params.id, function(err, result) {

        let author = {};

        if (result) {
            author = authorService.createAuthorObject(result);
        }
        
        connection.end();
        res.charSet('utf8');
        res.send(200, author);
    });
});

server.get('/authors/:term', function(req, res) {
    console.log("Server, search authors");
    var connection = getConnection();
    authorService.setConnection(connection);

    authorService.searchAuthors(req.params.term, function(err, result) {
        if (err) {
            console.log("Error: " + err);
            return;
        }
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
});

server.get('/authors', function(req, res) {
    var connection = getConnection();
    authorService.setConnection(connection);

    authorService.getAllAuthors(function(err, result) {
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
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

server.listen(config.server.port, function(err) {
    if (err) {
        console.log("Server error: " + err);
        return;
    }
    console.log('%s listening at %s', server.name, server.url);
});


export default server;
