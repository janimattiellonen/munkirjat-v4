
export default class StatsService {
    
    setConnection(connection) {
        this.connection = connection;
    }
    
	function getStatistics() {
	    let stats = {
	        	"authorCount" 		: this.getAuthorCount(),
	        	"bookCount" 		: this.getBookCount(),
	        	"unreadBookCount" 	: this.getUnreadBookCount(),
	        	"pageCount"			: this.getPageCount(),
	        	"readPageCount"		: this.getReadPageCount(),
	        	"moneySpent"		: this.getMoneySpentOnBooks(),
	        	"avgBookPrice"		: this.getAverageBookPrice(),
	        	"slowestReadTime"	: this.getSlowestReadTime(),
	        	"fastestReadTime"	: this.getFastestReadTime(),
	        	"avgReadTime"		: this.getAverageReadTime(),
	        	"timeToReadAll"		: this.getEstimatedTimeToReadAllUnreadBooks()
	    }
	},

	function getAuthorCount() {
		let query = "SELECT COUNT(*) AS author_count FROM authors";
	},

	function getBookCount() {
		let query = "SELECT COUNT(*) AS book_count FROM books";
	}
}



