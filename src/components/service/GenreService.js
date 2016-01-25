import _ from 'lodash';

export default class GenreService {
    setConnection(connection) {
        this.connection = connection;
    }

    getAllGenres(callback) {
        this.connection.query(
            `SELECT
                g.id,
                g.name,
                count(bg.resource_id) as amount
            FROM
                xi_tag AS g 
                JOIN xi_tagging AS bg ON g.id = bg.tag_id AND bg.resource_type = 'book'
            GROUP BY
              bg.tag_id
            ORDER BY 
                amount DESC , g.name ASC;`,
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