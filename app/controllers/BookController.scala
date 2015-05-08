package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.contrib.services.CachedCookieAuthenticator
import com.mohiva.play.silhouette.core.{Silhouette, Environment}
import models.{User, Book}
import models.daos.slick.DBTableDefinitions._
import models.daos.slick.DBTableDefinitions.{Book => BookTable}
import play.api.data.Forms._
import play.api.data.{FormError, _}
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc._

import scala.collection.mutable.ListBuffer
import scala.concurrent.Future

class BookController @Inject() (implicit val env: Environment[User, CachedCookieAuthenticator])
	extends Silhouette[User, CachedCookieAuthenticator] with BaseController {

    // todo: use SecuredAction.async
	def create = Action.async { implicit request =>
	    val data	 = new ListBuffer[Map[String, JsValue]]()
		val bookForm = createBookForm()
		
        implicit val errorWrites = new Writes[FormError] {
        	def writes(formError: FormError) = Json.obj(
        		"key" -> formError.key,
        		"message" -> formError.message
        	)
		}
	    
		bookForm.bindFromRequest.fold(
			formWithErrors => {
	            data += Map("errors" -> Json.toJson(formWithErrors.errors))

				Future.successful(BadRequest(Json.toJson(data)))
			},
			bookData => {
			    
			    data += Map(
			    	"id" -> Json.toJson(getBookService().createBook(bookData))
			    )

				Future.successful(Ok(Json.toJson(data)))
			}
		)
	}

    // todo: use SecuredAction.async
	def update(bookId:Int) = Action.async { implicit request =>
	    val data	 = new ListBuffer[Map[String, JsValue]]()
	    
		val bookForm = createBookForm()
		
        implicit val errorWrites = new Writes[FormError] {
        	def writes(formError: FormError) = Json.obj(
        		"key" -> formError.key,
        		"message" -> formError.message
        	)
		}
	    
		bookForm.bindFromRequest.fold(
			formWithErrors => {
	            data += Map("errors" -> Json.toJson(formWithErrors.errors))

				Future.successful(BadRequest(Json.toJson(data)))
			},
			bookData => {
			    
			    getBookService().updateBook(bookId, bookData)

				Future.successful(Ok(Json.toJson(data)))
			}
		)
	}
	
	def get(bookId:Int) = Action {
	    val data						= new ListBuffer[Map[String, JsValue]]()
	    val result:(Option[BookRow], List[(Int, String, String)])= getBookService().getBook(bookId)

	    val book:BookRow = result._1.getOrElse(null)
	    
	    if (null != book) {
	        
	        val authors	= new ListBuffer[Map[String, JsValue]]()
	        
	        for (author <- result._2) {
                authors += Map(
	            	"id" -> Json.toJson(author._1),
	            	"firstname" -> Json.toJson(author._2),
	            	"lastname" -> Json.toJson(author._3)
	            )
	        }
	        
	    	data += Map(
	    		"id" 				-> Json.toJson(book.id),
	    		"title"				-> Json.toJson(book.title),
	    		"languageId"		-> Json.toJson(book.languageId),
	    		"pageCount"			-> Json.toJson(book.pageCount),
	    		"price"				-> Json.toJson(book.price),
	    		"isRead"			-> Json.toJson(book.isRead),
	    		"startedReading"	-> Json.toJson(book.startedReading),
	    		"finishedReading"	-> Json.toJson(book.finishedReading),
	    		"isbn"				-> Json.toJson(book.isbn),
	    		"authors"			-> Json.toJson(authors)
	    	)  
	    }

		Ok(Json.toJson(data))
	}

    def listBooks(mode:String) = Action.async {
      val data = new ListBuffer[Map[String, JsValue]]()

      val books:List[(Int, String, Boolean)] = getBookService().listBooks(mode)

      for (book <- books) {
          data += Map(
              "id" -> Json.toJson(book._1),
              "title" -> Json.toJson(book._2),
              "isRead" -> Json.toJson(book._3)
          )
      }

      Future.successful(Ok(Json.toJson(data)))
    }

    def isNumeric(input: String): Boolean = {
        try {
            java.lang.Double.parseDouble(input)
            true
        } catch {
            case e: Exception => false
        }
    }

    def createBookForm(): Form[Book] = {
        val bookForm = Form(
            mapping(
                "title" 			-> text.verifying("Title is required", {!_.isEmpty}),
                "authors" 			-> list(number).verifying("At least one author is required", e => e.size >= 1),
                "price"  			-> bigDecimal.verifying("The price cannot be negative", {_ >= 0.0}),
                "languageId" 		-> text.verifying("Language is required", {!_.isEmpty}),
                "pageCount"			-> number.verifying("A book must have at least 1 page", {_ >= 1}),
                "isRead"			-> optional(boolean),
                "startedReading" 	-> optional(text),
                "finishedReading" 	-> optional(text),
                "isbn"				-> optional(text)
            )(Book.apply)(Book.unapply)
        )

        return bookForm
    }
	
	def bookFormTemplate = SecuredAction {
	    Ok(views.html.bookform(""))
	}
}