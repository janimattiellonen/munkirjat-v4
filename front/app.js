var React 			= require('react');
var Router 			= require('react-router');
var Route 			= Router.Route;
var DefaultRoute 	= Router.DefaultRoute;
var AuthorForm		= require('./components/AuthorForm');
var AuthorView		= require('./components/AuthorView');
var AuthorsView		= require('./components/AuthorsView');
var BooksView		= require('./components/BooksView');
var Home			= require('./components/Home');
var translations 	= require('./translations');
var Translate   	= require('react-translate-component');
var flux 			= require('./flux');

translations.initTranslations();

var MunkirjatApp = require('./components/MunkirjatApp');

var routes = (
	<Route handler={MunkirjatApp} path="/">
		<DefaultRoute handler={Home}/>
		<Route name="newAuthor" path="/new-author" handler={AuthorForm} />
		<Route name="editAuthor" path="/author/:id/edit" handler={AuthorForm} />
		<Route name="viewAuthor" path="/author/:id" handler={AuthorView} />
		<Route name="listAuthors" path="/authors" handler={AuthorsView} />
		<Route name="listBooks" path="/books" handler={BooksView} />
	</Route>
);

Router.run(routes, function (Handler, state) {
	React.render(<Handler flux={flux}/>, document.getElementById('page'));
});