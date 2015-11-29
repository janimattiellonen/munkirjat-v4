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

        /*
        let formData = {
            title: this.state.title,
            authors: this.state.authors,
            language: this.state.language,
            pageCount: this.state.pageCount,
            price: this.state.price,
            isRead: this.state.isRead,
            startedReading: this.state.startedReading,
            finishedReading: this.state.finishedReading
        };
        */

        /*

          `id` int(11) NOT NULL AUTO_INCREMENT,
          `title` varchar(128) NOT NULL,
          `language_id` varchar(3) NOT NULL,
          `page_count` int(11) NOT NULL,
          `is_read` tinyint(1) NOT NULL,
          `isbn` varchar(40) DEFAULT NULL,
          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
          `started_reading` timestamp NULL DEFAULT NULL,
          `finished_reading` timestamp NULL DEFAULT NULL,
          `rating` double DEFAULT NULL,
          `price` decimal(21,2) DEFAULT NULL,
        */
    }

    addAuthors(bookId, authors, callback) {

        let params = [];

        authors.map(authorId => {
            params.push(bookId);
            params.push(authorId);
        });

        // must most likely replace? with :foo1, :foo2 and so on due to this being used: https://www.npmjs.com/package/mysql#custom-format
        let placeHolders = _.trimRight("(?, ?),".repeat(params.length / 2), ',');
        console.log("placeholders: " + placeHolders);
        this.connection.query(
            `INSERT INTO 
                book_author (book_id, author_id) 
            VALUES 
                ${placeHolders}`,
            params,
            callback
        ); 
    }

    getBook(id, callback) {
        this.connection.query(
            `SELECT
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
                book AS b
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
};
