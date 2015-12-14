

export default class AuthorService {
    constructor(db) {
        // maybe not needed?
        this.db = db;
    }

    setConnection(connection) {
        this.connection = connection;
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
                CONCAT(firstname, ' ', lastname) AS name
            FROM 
                author AS a
            WHERE
                a.id = :id`,
            {id: id},
            callback
        );
    }  

    getAuthorWithBooks(id, callback) {
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
                LEFT JOIN book_author AS ba ON b.id = ba.book_id
                RIGHT JOIN author AS a ON a.id = ba.author_id
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

    updateAuthor(id, author, callback) {
        this.connection.query(
            'UPDATE author set firstname = :firstname, lastname = :lastname WHERE id = :id',
            {
                firstname: author.firstname,
                lastname: author.lastname,
                id: id
            },
            callback
        );
    }


    searchAuthors(term, callback) {
        let query = `SELECT
              a.id,
              a.firstname,
              a.lastname,
              CONCAT(firstname, ' ', lastname) AS name
            FROM
              author a
            WHERE
              a.firstname LIKE :term
              OR a.lastname LIKE :term 
            ORDER BY
              a.lastname ASC, a.firstname ASC`;

        this.connection.query(query, {term: term + '%'}, callback);
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
