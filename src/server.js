import uuid from 'node-uuid';
import { List } from 'immutable';
import { createServer } from './util/server';
import config from '../config.server';
import webpackConfig from '../webpack.config';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import jwt from 'express-jwt';
import dotenv from 'dotenv';

import AuthorService from './components/service/AuthorService';
import BookService from './components/service/BookService';
import GenreService from './components/service/GenreService';
import Immutable from 'immutable';
import * as Utils from './components/utils';
import fs from 'fs';
import express from 'express';
import Jimp from 'jimp';


dotenv.load();

const ENV = process.env.NODE_ENV;

let authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

createServer(config, webpackConfig, (app) => {
    app.use(bodyParser({limit: '50mb'}));
    app.use(express.static('web'));

    let authorService = new AuthorService();
    let bookService = new BookService();
    let genreService = new GenreService();

    app.get('/api/book/:id', function(req, res) {
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
          res.status(200).json(book);
          connection.end();
      });
    });

    app.get('/api/protected', authenticate, function( req, res) {
        res.charSet = 'utf8';
        res.status(200).json({status: "AUTHENTICATED"});
    });

    app.get('/api/books/:mode', function (req, res) {
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
            res.status(200).json(books.toArray());
            connection.end();

        });
    });

    app.post('/api/book', authenticate, function(req, res) {
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

            req.body.authors.map(author => {
                authors.push(author.value);
            });

            req.body.genres.map(genre => {
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
                        res.status(200).json(book);
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

    app.put('/api/book/:id', authenticate, function(req, res) {
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
                    res.status(200).json(book);
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
                bookService.removeGenres(id, function(err, result) {
                    if (err) {
                        handleError(err, res);
                        connection.end();
                        return;
                    }

                    handleGetBook(id);
                });
            }
        });
    });
});

    app.post('/api/author', authenticate, function(req, res) {
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
                res.status(200).json(author);
                connection.end();
            });
        });
    });

    app.put('/api/author/:id', authenticate, function(req, res) {
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
            res.status(200).json(author);
            connection.end();
        });
    }

    app.get('/api/author/:id', function(req, res) {
        let connection = getConnection();
        authorService.setConnection(connection);

        loadAuthorWithBooks(req.params.id, connection, res);
    });

    app.get('/api/authors/:term', function(req, res) {
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
            res.status(200).json(result);
        });
    });

    app.get('/api/authors', function(req, res) {
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
            res.status(200).json(result);
        });
    });

    app.get('/api/genres', function(req, res) {
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
            res.status(200).json(result);
        });
    });

    app.get('/api/genres/:term', function(req, res) {
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
            res.status(200).json(result);
        });
    });

    function handleError(err, res) {
        if(err) {
            console.log("Request failed: " + err);

            let result = {
                status: false,
                message: 'Request failed due to server error'
            };

            res.charSet = 'utf8';
            res.status(500).json(result);
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
});
