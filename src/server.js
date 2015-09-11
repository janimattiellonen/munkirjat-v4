var config = require('./config');
var restify = require('restify');
var http = require('follow-redirects').http;
import uuid from 'node-uuid';
var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/books', function (req, res) {

    var data = [
        {id: 1, title: "Book 1", isRead: true},
        {id: 2, title: "Book 2", isRead: true},
        {id: 3, title: "Book 3", isRead: true},
        {id: 4, title: "Book 4", isRead: false},
    ];

    res.charSet('utf8');
    res.send(200, data);
});


server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});

export default server;
