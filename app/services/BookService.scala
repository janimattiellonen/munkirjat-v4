package services
import java.sql.Timestamp
import java.text.SimpleDateFormat
import java.util.Date

import models.Book
import models.daos.slick.DBTableDefinitions.{Book => BookTable, _}

import scala.collection.mutable.ListBuffer
import scala.slick.driver.MySQLDriver
import scala.slick.driver.MySQLDriver.simple._
import scala.slick.jdbc.StaticQuery.interpolation
import scala.slick.jdbc.{GetResult, StaticQuery => Q}

import play.Logger

class BookService(val books: TableQuery[BookTable], db: Database, authorService: AuthorService) {
    
    def getBook(bookId: Int):(Option[BookRow], List[(Int, String, String)]) = {
        (db.withSession { implicit session =>    
        	books.filter{ _.id === bookId }.firstOption
        }, getAuthorsForBook(bookId))
    }
    
    def getAuthorsForBook(bookId: Int):List[(Int, String, String)] = {
        
        val data = new ListBuffer[(Int, String, String)]()
        
        db.withSession { implicit session =>            
            val authorList:List[BookAuthorRow] = TableQuery[BookAuthor].filter{ _.bookId === bookId }.list
            	
            for (bookAuthorRow <- authorList) {
                
                val author = authorService.getAuthor(bookAuthorRow.authorId).getOrElse(null)
                val tuple = (author.id, author.firstname, author.lastname);
                data += tuple
            }	
            
            data.toList
        }
    }

    def getBooksFor(authorId:Int): List[(Int, String, Boolean)] = {
        db.withSession { implicit session =>
          val booksByAuthorId = Q[Int, (Int, String, Boolean)] + """
              SELECT
                  b.id,
                  b.title,
                  b.is_read AS isRead
              FROM
                  book AS b LEFT JOIN book_author AS ba ON b.id = ba.book_id
              WHERE
                  ba.author_id = ?"""

          booksByAuthorId(authorId).list
        }
    }
    
    def createBook(bookData: Book):Int = {

        db.withSession { implicit session =>
            val bookId:Int = (books returning books.map(_.id)) += createBookRowForInsert(bookData)

            addAuthorsToBook(bookId, bookData.authors)

            bookId
          }
    }

    def updateBook(bookId: Int, bookData: Book) = {
        db.withSession { implicit session =>
            books.filter(_.id === bookId).update(createBookRowForUpdate(bookId, bookData, getBook(bookId)._1.getOrElse(null)))

          deleteAuthors(bookId)

            addAuthorsToBook(bookId, bookData.authors);
        }
    }

    def addAuthorsToBook(bookId:Int, authorIds:List[Int]) = {

        val bookAuthors = TableQuery[BookAuthor]

        db.withSession { implicit session =>
          for(authorId <- authorIds) {
              bookAuthors += BookAuthorRow(bookId, authorId)
          }
        }
    }

    def deleteAuthors(bookId:Int) = {
        val bookAuthors = TableQuery[BookAuthor]

        db.withSession { implicit session =>
          def deleteTheAuthors(id: Int) = sqlu"delete from book_author where book_id = $id".list
          deleteTheAuthors(bookId)
        }
    }

    def createBookRowForInsert(bookData:Book):BookRow = {
          val now = new Timestamp(new Date().getTime())

          createBookRow(0, now, now, bookData)
      }

    def createBookRowForUpdate(bookId:Int, bookData:Book, oldBookData: BookRow):BookRow = {
          val createdAt 				= oldBookData.createdAt
          val updatedAt 				= oldBookData.updatedAt

          createBookRow(bookId, createdAt, updatedAt, bookData)
      }

    def createBookRow(bookId:Int, createdAt:Timestamp, updatedAt:Timestamp, bookData:Book):BookRow = {
          val startedReadingTs 	= toTimestamp(bookData.startedReading)
          val finishedReadingTs 	= toTimestamp(bookData.finishedReading)

          BookRow(
            bookId,
            bookData.title,
            bookData.languageId,
            bookData.pageCount,
            bookData.isRead.getOrElse(false),
            Some(bookData.isbn),
            createdAt,
            updatedAt,
            startedReadingTs,
            finishedReadingTs,
            Some(0.0),
            Some(bookData.price)
          )
    }

    def toTimestamp(date:Option[String]):Option[Timestamp] = {
        val value:String 	= date.getOrElse(null)
        val format 			= new SimpleDateFormat("dd.MM.yyyy")

        if(value != null) Some(new Timestamp(format.parse(value).getTime())) else Some(null)
    }
}