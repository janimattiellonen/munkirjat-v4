import _ from 'lodash';

export default class GenreService {
    setConnection(connection) {
        this.connection = connection;
    }

    getAllGenres(callback) {
        this.connection.query(
            `SELECT
                g.id,
                g.name
            FROM
                xi_tag AS g 
            ORDER BY 
                g.name ASC`,
            callback
        );
    }

	searchGenres(term, callback) {
        let query = `SELECT
              g.id,
              g.name,
              g.slug
            FROM
              xi_tag g
            WHERE
              g.name LIKE :term
            ORDER BY
              g.name ASC`;

        this.connection.query(query, {term: term + '%'}, callback);
	}
}