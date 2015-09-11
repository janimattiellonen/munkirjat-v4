var config = require('./config');
var restify = require('restify');
var http = require('follow-redirects').http;
import uuid from 'node-uuid';
var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));

server.get('/statuses', function (req, res) {
    console.log("Serving statuses...");
    var data = [
        {text: "Janimatti Ellonen", uuid: uuid.v4()},
        {text: "Steve Moses", uuid: uuid.v4()},
    ];

    res.charSet('utf8');
    res.send(200, data);
});

server.get('/courses', function(req, res) {
    var data = [
        {value: "11", label: "Tali", par: 57, length: 1334, holes: 18, layout: {id: 11, name: "Tali", par: 57, length: 1334, holeCount: 18}},
        {value: "12", label: "Kivikko", par: 56, length: 1250, holes: 18, layout: {id: 12, name: "Kivikko", par: 56, length: 1250, holeCount: 18}},
        {value: "340", label: "Oittaa" , par: 36, length: 867, holes: 12, layout: {id: 340, name: "Oittaa", par: 36, length: 867, holeCount: 12}},
        {value: "14", label: "Kaatis", par: 63, length: 2193, holes: 19, layout: {id: 14, name: "19-etu", par: 63, length: 2193, holeCount: 19}},
        {value: "15", label: "Kaatis", par: 63, length: 2623, holes: 19, layout: {id: 15, name: "19-taka", par: 63, length: 2623, holeCount: 19}},
    ];

    res.charSet('utf8');
    res.send(200, data);
});

server.get('/course/layout/:lid', function(req, res) {
    console.log("Serving /course/layout/:lid...");

    var course = {
        value: 340,
        label: 'Oittaa',
        layout: {
            id: 340,
            name: 'Oittaa',
            holeCount: 12,
            par: 36,
            length: 867,
            holes: [
                {number: 1, par: 3, length: 53},
                {number: 2, par: 3, length: 80},
                {number: 3, par: 3, length: 71},
                {number: 4, par: 4, length: 129},
                {number: 5, par: 3, length: 76},
                {number: 6, par: 3, length: 79},
                {number: 7, par: 3, length: 76},
                {number: 8, par: 3, length: 65},
                {number: 9, par: 3, length: 77},
                {number: 10, par: 3, length: 65},
                {number: 11, par: 2, length: 31},
                {number: 12, par: 3, length: 65},
            ] 
        }
    };
    console.log(JSON.stringify(course));
    res.charSet('utf8');
    res.send(200, [course]);
});

server.get('/players', function (req, res) {
    var data = [
        {value: "2525", label: "Janimatti Ellonen", uuid: uuid.v4()},
        {value: "123", label: "Ville Mikkola", uuid: uuid.v4()},
        {value: "46", label: "Tomi Kulmala", uuid: uuid.v4()},
        {value: "78", label: "Mikko Juola", uuid: uuid.v4()},
    ];

    res.charSet('utf8');
    res.send(200, data);
});

server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});

export default server;
