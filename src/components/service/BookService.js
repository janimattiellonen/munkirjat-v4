

export default class BookService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    prepare(connection, callback) {
        this.connection = connection;
        this.callback = callback;
    }

    getBook(id) {
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
            this.callback
        );
    }

    getAllBooks() {
        this.connection.query(
            this.createGetBooksQuery(),
            this.callback
        );
    }

    getReadBooks() {
        let query = this.createGetBooksQuery(true);

        this.connection.query(
            query,
            this.callback
        );
    }

    getUnreadBooks() {
        let query = this.createGetBooksQuery(false);

        this.connection.query(
            query,
            this.callback
        );
    }

    createGetBooksQuery(isRead = null) {
        let query = `SELECT
            b.id,
            b.title,
            b.is_read
        FROM 
            book AS b`;

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
