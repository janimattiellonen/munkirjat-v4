var React 			= require('react');
var ReactRouter 	= require('react-router');
var Router 			= ReactRouter.Router;
var Route 			= Router.Route;
var Redirect 		= Router.Redirect;
//var history 		= require('react-router/lib/HashHistory');
var history 		= Router.History;
var AboutView       = require('./components/AboutView');
var AuthorForm		= require('./components/AuthorForm');
var AuthorView		= require('./components/AuthorView');
var AuthorsView		= require('./components/AuthorsView');
var BookForm		= require('./components/BookForm');
var BookView		= require('./components/BookView');
var BooksView		= require('./components/BooksView');
var Home			= require('./components/Home');
var translations 	= require('./translations');
var Translate   	= require('react-translate-component');
var flux 			= require('./flux');


translations.initTranslations();

var MunkirjatApp = require('./components/MunkirjatApp');
var routes = (
	<Router history={history}>
		<Redirect from="/" to="/home" />
		<Route component={MunkirjatApp} path="/">
			<Route name="home" path="home" component={Home} />
	        <Route name="about" path="about" component={AboutView} />
			<Route name="newAuthor" path="new-author" component={AuthorForm} />
			<Route name="editAuthor" path="author/:id/edit" component={AuthorForm} />
			<Route name="viewAuthor" path="author/:id" component={AuthorView} />
			<Route name="listAuthors" path="authors" component={AuthorsView} />
			<Route name="newBook" path="new-book" component={BookForm} />
			<Route name="editBook" path="book/:id/edit" component={BookForm} />
			<Route name="viewBook" path="book/:id" component={BookView} />
			<Route name="listBooks" path="books" component={BooksView} />
	        <Route name="listUnreadBooks" path="books/unread" component={BooksView} />
		</Route>
	</Router>

);

React.render(routes, document.getElementById('page'));

/*

Router.run(routes, function (Handler) {
	React.render(<Handler flux={flux}/>, document.getElementById('page'));
});
 */
