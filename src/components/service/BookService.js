import _ from 'lodash';

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
                language_id: book.language_id,
                page_count: book.page_count,
                is_read: book.is_read,
                started_reading: book.started_reading,
                finished_reading: book.finished_reading,
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

        let placeHolders = _.trimRight(placeholders, ',');
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
                b.price
            FROM 
                book AS b LEFT JOIN book_author AS ba ON b.id = ba.book_id
                LEFT JOIN author AS a ON a.id = ba.author_id
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
                a.firstname,
                a.lastname,
                CONCAT(firstname, ' ', lastname) AS author_name
        FROM 
            book AS b
            LEFT JOIN book_author AS ba ON ba.book_id = b.id
            LEFT JOIN author AS a ON ba.author_id = a.id
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

    createBookObject(result) {
        let authors = [];
        let book = null;

        result.map(row => {
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
                    authors: [{
                        id: row.author_id,
                        firstname: row.firstname,
                        lastname: row.lastname,
                        name: row.author_name
                    }]
                };
            } else {
                book.authors.push({
                    id: row.author_id,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    name: row.author_name
                });
            }
        }); 

        return book;       
    }
};
