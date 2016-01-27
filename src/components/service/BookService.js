import _ from 'lodash';
import {OrderedMap} from 'immutable';

export default class BookService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    setConnection(connection) {
        this.connection = connection;
    }

    createBook(book, callback) {
        this.connection.query(
            `INSERT INTO 
                book (title, language_id, page_count, is_read, started_reading, finished_reading, price) 
            VALUES 
                (:title, :language, :pageCount, :isRead, :startedReading, :finishedReading, :price)`,
            {
                title: book.title,
                language: book.language,
                pageCount: book.pageCount,
                price: book.price,
                isRead: book.isRead,
                startedReading: book.startedReading,
                finishedReading: book.finishedReading
            },
            callback
        );
    }

    updateBook(id, book, callback) {
        this.connection.query(
            `UPDATE 
                book 
            SET 
                title = :title, 
                language_id = :language_id, 
                page_count = :page_count, 
                is_read = :is_read, 
                started_reading = :started_reading, 
                finished_reading = :finished_reading, 
                price = :price 
            WHERE 
                id = :id`,
            {
                title: book.title,
                language_id: book.language,
                page_count: book.pageCount,
                is_read: book.isRead,
                started_reading: book.startedReading,
                finished_reading: book.finishedReading,
                price: book.price,
                id: id
            },
            callback
        );
    }

    addAuthors(bookId, authors, callback) {

        let params = {};
        let placeholders = "";

        authors.map((authorId, i) => {
            let bookParam = "bookId" + i;
            let authorParam = "authorId" + i;

            placeholders += "(:" + bookParam + ", :" + authorParam + "),";

            params[bookParam] = bookId;
            params[authorParam] = authorId;
        });

        let placeHolders = _.trimEnd(placeholders, ',');
        this.connection.query(

            `INSERT INTO book_author (book_id, author_id) VALUES ${placeHolders}`,
            params,
            callback
        ); 
    }

    setAuthors(id, authors, callback) {
        let self = this;

        this.removeAuthors(id, function(err, result) {
            if (err) {
                throw err;
            }

            self.addAuthors(id, authors, callback);
        });
    }

    removeAuthors(id, callback) {
        this.connection.query(
            `DELETE ba FROM book_author AS ba WHERE ba.book_id = :id`,
            {id: id},
            callback
        );
    }

    addGenres(bookId, genres, callback) {
        let params = {};
        let placeholders = "";

        genres.map((genreId, i) => {
            let bookParam = "bookId" + i;
            let genreParam = "genreId" + i;

            placeholders += "(:" + bookParam + ", :" + genreParam + ", 'book'),";

            params[bookParam] = bookId;
            params[genreParam] = genreId;
        });

        let placeHolders = _.trimEnd(placeholders, ',');
        this.connection.query(

            `INSERT INTO xi_tagging (resource_id, tag_id, resource_type) VALUES ${placeHolders}`,
            params,
            callback
        ); 
    }

    setGenres(id, genres, callback) {

        this.removeGenres(id, (err, result) => {
            if (err) {
                throw err;
            }
                        
            this.addGenres(id, genres, callback);
        });
    }    

    removeGenres(bookId, callback) {
        this.connection.query(
            `DELETE bg FROM xi_tagging AS bg WHERE bg.resource_id = :bookId`,
            {bookId: bookId},
            callback
        );
    }

    getBook(id, callback) {
        this.connection.query(
            `SELECT
                a.id AS author_id,
                a.firstname,
                a.lastname,
                CONCAT(a.firstname, ' ', a.lastname) AS author_name,
                b.id,
                b.title,
                b.language_id,
                b.page_count,
                b.is_read,
                b.isbn,
                b.created_at,
                b.updated_at,
                b.started_reading,
                b.finished_reading,
                b.rating,
                b.price,
                g.id AS genre_id,
                g.name AS genre_name
            FROM 
                book AS b LEFT JOIN book_author AS ba ON b.id = ba.book_id
                LEFT JOIN author AS a ON a.id = ba.author_id
                LEFT JOIN xi_tagging AS bg ON b.id = bg.resource_id
                LEFT JOIN xi_tag AS g ON g.id = bg.tag_id
            WHERE
                b.id = :id`,
            {id: id},
            callback
        );
    }

    getBooks(mode, callback) {
        switch (mode) {
            case 'read': 
                this.getReadBooks(callback);
                break;
            case 'unread':
                this.getUnreadBooks(callback);
                break;
            default:
                this.getAllBooks(callback);
                break;
        }
    }

    getAllBooks(callback) {
        this.connection.query(
            this.createGetBooksQuery(),
            callback
        );
    }

    getReadBooks(callback) {
        let query = this.createGetBooksQuery(true);

        this.connection.query(
            query,
            callback
        );
    }

    getUnreadBooks(callback) {
        let query = this.createGetBooksQuery(false);

        this.connection.query(
            query,
            callback
        );
    }

    createGetBooksQuery(isRead = null) {
        let query = `SELECT
                b.id,
                b.title,
                b.language_id,
                b.page_count,
                b.is_read,
                b.isbn,
                b.created_at,
                b.updated_at,
                b.started_reading,
                b.finished_reading,
                b.rating,
                b.price,
                a.id AS author_id,
                a.firstname,
                a.lastname,
                CONCAT(firstname, ' ', lastname) AS author_name,
                g.id AS genre_id,
                g.name AS genre_name
        FROM 
            book AS b
            LEFT JOIN book_author AS ba ON ba.book_id = b.id
            LEFT JOIN author AS a ON ba.author_id = a.id
            LEFT JOIN xi_tagging AS bg ON b.id = bg.resource_id
            LEFT JOIN xi_tag AS g ON g.id = bg.tag_id
        `;

        if (null !== isRead) {
            if(isRead) {
                query += ' WHERE b.is_read = 1';
            } else {
                query += ' WHERE b.is_read != 1';
            }
        }

        query += ' ORDER BY b.title ASC';
        
        return query;
    }

    toArray(book) {
        book.genres = book.genres.toArray();
        book.authors = book.authors.toArray();

        return book;
    }

    createBookObject(result) {
        if (result.length == 0) {
            return null;
        }

        let books = this.createBookObjects(result);

        return books.first();
    }

    createBookObjects(result) {
        let books = OrderedMap();

        result.map(row => {
            var book = books.get(row.id);

            if (null == book) {
                book = {
                    id: row.id,
                    title: row.title,
                    language_id: row.language_id,
                    page_count: row.page_count,
                    is_read: row.is_read,
                    started_reading: row.started_reading,
                    finished_reading: row.finished_reading,
                    price: row.price,
                    authors: OrderedMap(),
                    genres: OrderedMap()
                };
            }

            book.authors = book.authors.set(row.author_id, {
                id: row.author_id,
                firstname: row.firstname,
                lastname: row.lastname,
                name: row.author_name
            });

            if (null != row.genre_id) {
                book.genres = book.genres.set(row.genre_id, {
                    id: row.genre_id,
                    name: row.genre_name
                });   
            }

            books = books.set(book.id, book);
        });

        return books;
    }
};
