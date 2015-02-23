var React 			= require('react');
var Router 			= require('react-router');
var Route 			= Router.Route;
var DefaultRoute 	= Router.DefaultRoute;
var AuthorForm		= require('./components/AuthorForm');
var Home			= require('./components/Home');
var counterpart 	= require('counterpart');
var Translate   	= require('react-translate-component');
var flux 			= require('./flux');

counterpart.registerTranslations('en', {
  	"bookCount": "Books in bookshelf",
	"readPageCount": "Pages read so far",
	"fastestReadTime": "Fastest read time",
	"pageCount": "Pages in the bookshelf",
	"moneySpent": "Money spent on books",
	"books":    "{{books}} books",
	"avgBookPrice": "Average book price",
	"avgReadTime": "Average read time",
	"timeToReadAll": "Estimated time to read all unread books",
	"slowestReadTime": "Slowest read time",
	"authorCount": "Authors in bookshelf",
	"unreadBookCount":    "Unread books",
	"currentlyReading":    "Currently reading",
	"latestRead":    "Latest read book",
	"latestAdded":    "Latest added books",
	"favouriteAuthors":    "Favourite authors",
	"recentlyRead":    "Recently read books",
	"unread":    "Unread books",
	"formBookTitle":    "Title",
	"formBookPageCount":    "Page count",
	"formBookAuthors":    "Authors",
	"formBookPrice":    "Price",
	"formBookIsRead":    "Is read",
	"formBookIsbn":    "Isbn",
	"formStartedReading":    "Started reading",
	"formFinishedReading":    "Finished reading",
	"formStartReading":    "Start reading",
	"formFinishReading":    "Finish reading",
	"formBookLanguage":    "Language",
	"formBookFinnish":    "Finnish",
	"formBookSwedish":    "Swedish",
	"formBookEnglish":    "English",
	"formBookSave":    "Save",
    "formBookSaved":    "Book saved",
    "formBookFailedSaving": "Could not create book",
    "formBookFailedLoading":  "Could not load book details",
    "formAuthorSave":    "Save",
    "formAuthorFirstname": "Firstname",
	"formAuthorLastname": "Lastname",
    "formAuthorSaved":    "Author saved",
    "formAuthorFailedSaving": "Could not create author",
    "formAuthorFailedLoading":  "Could not load author details",
    "formAuthorsFailedLoading": "Could not load authors",
	"daysRead": "days",
	"latestReadBook": "Latest read book",
	"latestAddedBooks": "Latest added books",

	"error": {
		"real": "Not a valid number",
		"number": "Not a valid number"
	}
});

var MunkirjatApp = require('./components/MunkirjatApp');

var routes = (
	<Route handler={MunkirjatApp} path="/">
		<DefaultRoute handler={Home}/>
		<Route name="editAuthor" path="/author/:id/edit" handler={AuthorForm} />
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler flux={flux}/>, document.getElementById('page'));
});


/*
Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('page'));
});
*/