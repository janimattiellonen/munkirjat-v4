

export default class AuthorService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    prepare(connection, callback) {
        this.connection = connection;
        this.callback = callback;
    }

    getAllAuthors() {
        this.connection.query(
            this.createGetAuthorsQuery(),
            this.callback
        );
    }

    getAuthor(id) {
        this.connection.query(
            `SELECT
                a.id,
                a.firstname,
                a.lastname,
                CONCAT(firstname, ' ', lastname) AS name,
                b.id AS book_id,
                b.title,
                b.is_read
            FROM 
                book AS b
                JOIN book_author AS ba ON b.id = ba.book_id
                JOIN author AS a ON a.id = ba.author_id
            WHERE
                a.id = :id`,
            {id: id},
            this.callback
        );
    }  

    createAuthor(author) {
        this.connection.query(
            'INSERT INTO author (firstname, lastname) VALUES (:firstname, :lastname)',
            {
                firstname: author.firstname,
                lastname: author.lastname
            },
            this.callback
        );
    }

    createGetAuthorsQuery() {
        let query = `SELECT
              a.id,
              a.firstname,
              a.lastname,
              CONCAT(firstname, ' ', lastname) AS name,
              count(b.id) AS amount
            FROM
              book b LEFT JOIN book_author ba ON b.id = ba.book_id
              RIGHT JOIN author a ON a.id = ba.author_id
            WHERE
              a.firstname IS NOT NULL AND a.lastname IS NOT NULL
            GROUP BY
              a.id
            ORDER BY
              lastname ASC, firstname ASC`;
        
        return query;
    }
};
