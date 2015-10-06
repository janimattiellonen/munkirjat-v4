

export default class BookService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    setConnection(connection) {
        this.connection = connection;
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
