import config from './config';
import restify from 'restify';
import {http} from 'follow-redirects';
import uuid from 'node-uuid';
let server = restify.createServer();
import mysql from 'mysql';
import AuthorService from './components/service/AuthorService';
import BookService from './components/service/BookService';
import GenreService from './components/service/GenreService';
import Immutable from 'immutable';
import * as Utils from './components/utils';
import jwt from 'restify-jwt';
import dotenv from 'dotenv';

dotenv.load();

let authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

server.use(restify.CORS());
server.use(restify.authorizationParser());
server.use(restify.bodyParser());

let authorService = new AuthorService();
let bookService = new BookService();
let genreService = new GenreService();

server.get('/api/book/:id', function(req, res) {    
    let connection = getConnection();
    bookService.setConnection(connection);

    let id = req.params.id;
    
    bookService.getBook(id, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        let book = bookService.createBookObject(result);
        book = bookService.toArray(book);

        res.charSet('utf8');
        res.send(200, book);
        connection.end();
    });
});

server.get('/api/protected', authenticate, function( req, res) {
    res.charSet('utf8');
    res.send(200, {status: "AUTHENTICATED"});
});

server.get('/api/books/:mode', function (req, res) {
    let connection = getConnection();
    bookService.setConnection(connection);

    let mode = req.params.mode;

    bookService.getBooks(mode, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        res.charSet('utf8');

        let books = bookService.createBookObjects(result);

        books.map(book => {
            book = bookService.toArray(book);

            return book;
        });

        res.send(200, books.toArray());
        connection.end();

    });
});

server.post('/api/book', authenticate, function(req, res) {
    let connection = getConnection();
    bookService.setConnection(connection);

    const {params} = req;

    let newBook = {
        title: params.title,
        language: params.language,
        pageCount: params.pageCount,
        price: params.price,
        isRead: params.isRead,
        startedReading: Utils.mysql_date(params.startedReading),
        finishedReading: Utils.mysql_date(params.finishedReading)
    };

    bookService.createBook(newBook, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        let createdBookId   = result.insertId;
        let authors         = [];
        let genres          = [];

        req.params.authors.map(author => {
            authors.push(author.value);
        });

        req.params.genres.map(genre => {
            genres.push(genre.value);
        });      

        bookService.addAuthors(createdBookId, authors, function(err, result) {
            if (err) {
                handleError(err, res);
                connection.end();
                return;
            }

            bookService.addGenres(createdBookId, genres, function(err, result) {
                if (err) {
                    handleError(err, res);
                    connection.end();
                    return;
                }                
                res.charSet('utf8');
                res.send(200, {"status": "OK", "id": createdBookId});
                connection.end();
            });
        });
    });
});

server.put('/api/book/:id', authenticate, function(req, res) {
    let connection = getConnection();
    bookService.setConnection(connection);

    const {params} = req;

    let updatedBook = {
        title: params.title,
        language: params.language,
        pageCount: params.pageCount,
        price: params.price,
        isRead: params.isRead,
        startedReading: Utils.mysql_date(params.startedReading),
        finishedReading: Utils.mysql_date(params.finishedReading)
    }

    let authors = params.authors.map(author => { return author.value });
    let genres  = params.genres.map(genre => { return genre.value});
    let id      = params.id;

    bookService.updateBook(id, updatedBook, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        bookService.setAuthors(id, authors, function(err, result) {
            if (err) {
                handleError(err, res);
                connection.end();
                return;
            }

            let handleGetBook = function(id) {
                bookService.getBook(id, function(err, result) {
                    let book = bookService.createBookObject(result);
                    res.charSet('utf8');
                    res.send(200, book);
                    connection.end();
                }); 
            };

            if (null != genres && genres.length > 0) {
                bookService.setGenres(id, genres, function(err, result) {
                    if (err) {
                        handleError(err, res);
                        connection.end();
                        return;
                    }     

                    handleGetBook(id);
                }); 
            } else {
                handleGetBook(id);
            }
        });
    });
});

server.del('/api/author/:id', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    authorService.removeAuthor(req.params.id, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        res.charSet('utf8');
        res.send(200, {status: "OK"});
        connection.end();
    });
});

server.post('/api/author', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);
    let newAuthor = {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
    };

    authorService.createAuthor(newAuthor, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        let createdAuthorId = result.insertId;

        authorService.getAuthorWithBooks(createdAuthorId, function(err, result) {
            if (err) {
                handleError(err, res);
                connection.end();
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

server.put('/api/author/:id', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    let updatedAuthor = {
        firstname: req.params.firstname,
        lastname: req.params.lastname,
    };

    let id = req.params.id;

    authorService.updateAuthor(id, updatedAuthor, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        loadAuthorWithBooks(id, connection, res);
    });
});

function loadAuthorWithBooks(authorId, connection, res) {
    authorService.getAuthorWithBooks(authorId, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
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
}

server.get('/api/author/:id', function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);
    
    loadAuthorWithBooks(req.params.id, connection, res);
});

server.get('/api/authors/:term', function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    authorService.searchAuthors(req.params.term, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
});

server.get('/api/authors', function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    authorService.getAllAuthors(function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
});

server.get('/api/genres', function(req, res) {
    let connection = getConnection();
    genreService.setConnection(connection);

    genreService.getAllGenres((err, result) => {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }
        
        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
});

server.get('/api/genres/:term', function(req, res) {
    let connection = getConnection();
    genreService.setConnection(connection);

    genreService.searchGenres(req.params.term, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        connection.end();
        res.charSet('utf8');
        res.send(200, result);
    });
});

function handleError(err, res) {
    if(err) {
        console.log("Request failed: " + err);

        let result = {
            status: false,
            message: 'Request failed due to server error'
        };

        res.charSet('utf8');
        res.send(500, result);
    }
}

function getConnection() {
    let connection = mysql.createConnection({
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
