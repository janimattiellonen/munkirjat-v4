import appConfig from './config';
import config from '../webpack.config';
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import uuid from 'node-uuid';
const server = express();
var http = require('http').Server(server);
import mysql from 'mysql';
import AuthorService from './components/service/AuthorService';
import BookService from './components/service/BookService';
import GenreService from './components/service/GenreService';
import Immutable from 'immutable';
import * as Utils from './components/utils';
import jwt from 'express-jwt';
const compiler = webpack(config);
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.load();

let authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

server.use(bodyParser.json());

server.use(require('webpack-hot-middleware')(compiler));

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

        res.charSet = 'utf8';
        res.status(200).send(book);
        connection.end();
    });
});

server.get('/api/protected', authenticate, function( req, res) {
    res.charSet = 'utf8';
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

        let books = bookService.createBookObjects(result);

        books = books.map(book => {
            return bookService.toArray(book);
        });

        res.charSet = 'utf8';
        res.status(200).send(books.toArray());
        connection.end();

    });
});

server.post('/api/book', authenticate, function(req, res) {
    let connection = getConnection();
    bookService.setConnection(connection);

    const {body, params} = req;

    let newBook = {
        title: body.title,
        language: body.language,
        pageCount: body.pageCount,
        price: body.price,
        isRead: body.isRead,
        startedReading: Utils.mysql_date(body.startedReading),
        finishedReading: Utils.mysql_date(body.finishedReading)
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

            let handleGetBook = function(id) {
                bookService.getBook(id, function(err, result) {
                    let book = bookService.createBookObject(result);
                    res.charSet = 'utf8';
                    res.status(200).send(book);
                    connection.end();
                }); 
            };        

            if (null != genres && genres.length > 0) {
                bookService.addGenres(createdBookId, genres, function(err, result) {
                    if (err) {
                        handleError(err, res);
                        connection.end();
                        return;
                    }                

                    handleGetBook(createdBookId);
                });
            } else {
                handleGetBook(createdBookId);
            }
        });
    });
});

server.put('/api/book/:id', authenticate, function(req, res) {
    let connection = getConnection();
    bookService.setConnection(connection);

    const {body, params} = req;

    let updatedBook = {
        title: body.title,
        language: body.language,
        pageCount: body.pageCount,
        price: body.price,
        isRead: body.isRead,
        startedReading: Utils.mysql_date(body.startedReading),
        finishedReading: Utils.mysql_date(body.finishedReading)
    }

    let authors = body.authors.map(author => { return author.value });
    let genres  = body.genres.map(genre => { return genre.value});
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
                    res.charSet = 'utf8';
                    res.status(200).send(book);
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

server.delete('/api/author/:id', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    authorService.removeAuthor(req.params.id, function(err, result) {
        if (err) {
            handleError(err, res);
            connection.end();
            return;
        }

        res.charSet = 'utf8';
        res.status(200).send({status: "OK"});
        connection.end();
    });
});

server.post('/api/author', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);
    let newAuthor = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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

            res.charSet = 'utf8';
            res.status(200).send(author);
            connection.end();
        });
    });
});

server.put('/api/author/:id', authenticate, function(req, res) {
    let connection = getConnection();
    authorService.setConnection(connection);

    let updatedAuthor = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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

        res.charSet = 'utf8';
        res.status(200).send(author);
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
        res.charSet = 'utf8';
        res.status(200).send(result);
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
        res.charSet = 'utf8';
        res.status(200).send(result);
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
        res.charSet = 'utf8';
        res.status(200).send(result);
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
        res.charSet = 'utf8';
        res.status(200).send(result);
    });
});

server.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../web/index.dev.html'));
});

http.listen(appConfig.port, function(){
  console.log('listening on *:' + appConfig.port);
});

function handleError(err, res) {
    if(err) {
        console.log("Request failed: " + err);

        let result = {
            status: false,
            message: 'Request failed due to server error'
        };

        res.charSet = 'utf8';
        res.status(500).send(result);
    }
}

function getConnection() {
    let connection = mysql.createConnection({
        host: appConfig.db.host,
        user: appConfig.db.user,
        password: appConfig.db.password,
        database: appConfig.db.database
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

export default server;
