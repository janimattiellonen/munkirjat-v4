var config = require('./config');
var restify = require('restify');
var http = require('follow-redirects').http;
import uuid from 'node-uuid';
var server = restify.createServer();
import mysql from 'mysql';

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/books', function (req, res) {

	var connection = getConnection();

    connection.query(
    	`SELECT
    		b.id,
    		b.title,
    		b.is_read
		FROM 
			book AS b 
		ORDER BY
			b.title ASC
		`, 
    	function(err, result) {
	        connection.end();
	        res.charSet('utf8');
	        res.send(200, result);
   		}
    );

});

server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});

function getConnection() {
    var connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    connection.connect();

    return connection;
}


export default server;
