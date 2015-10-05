

export default class AuthorService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    setConnection(db) {
        this.db = db;
    }

    getAllAuthors(callback) {
        this.connection.query(
            this.createGetAuthorsQuery(),
            callback
        );
    }

    getAuthor(id, callback) {
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
            callback
        );
    }  

    createAuthor(author, callback) {
        this.connection.query(
            'INSERT INTO author (firstname, lastname) VALUES (:firstname, :lastname)',
            {
                firstname: author.firstname,
                lastname: author.lastname
            },
            callback
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
