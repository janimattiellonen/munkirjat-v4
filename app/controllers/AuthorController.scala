package controllers

import models.Author
import play.api.data.{Form, FormError}
import play.api.data.Forms._
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc._
import models.daos.slick.DBTableDefinitions._
import models.daos.slick.DBTableDefinitions.{Author => AuthorTable}
import scala.collection.mutable.ListBuffer
import scala.concurrent.Future
import javax.inject.Inject
import com.mohiva.play.silhouette.contrib.services.CachedCookieAuthenticator
import com.mohiva.play.silhouette.core.{Environment, LogoutEvent, Silhouette}
import models.User

class AuthorController @Inject() (implicit val env: Environment[User, CachedCookieAuthenticator])
	extends Silhouette[User, CachedCookieAuthenticator] with BaseController {

	def create = SecuredAction.async { implicit request =>
	    val data	 = new ListBuffer[Map[String, JsValue]]()
		val authorForm = createAuthorForm()
		
        implicit val errorWrites = new Writes[FormError] {
        	def writes(formError: FormError) = Json.obj(
        		"key" -> formError.key,
        		"message" -> formError.message
        	)
		}
	    
		authorForm.bindFromRequest.fold(
			formWithErrors => {
	            data += Map("errors" -> Json.toJson(formWithErrors.errors))
		        	
		        Future.successful(BadRequest(Json.toJson(data)))
			},
			authorData => {
			    	 
			    data += Map(
			    	"id"  -> Json.toJson(getAuthorService().createAuthor(authorData))
			    )

				Future.successful(Ok(Json.toJson(data)))
			}
		)
	}
	
	def update(authorId: Int) = SecuredAction.async { implicit request =>
	    val data	 = new ListBuffer[Map[String, JsValue]]()
	    
		val authorForm = createAuthorForm()
		
        implicit val errorWrites = new Writes[FormError] {
        	def writes(formError: FormError) = Json.obj(
        		"key" -> formError.key,
        		"message" -> formError.message
        	)
		}
	    
		authorForm.bindFromRequest.fold(
			formWithErrors => {
	            data += Map("errors" -> Json.toJson(formWithErrors.errors))

				Future.successful(BadRequest(Json.toJson(data)))
			},
			authorData => {
			    
			    getAuthorService().updateAuthor(authorId, authorData)

				Future.successful(Ok(Json.toJson(data)))
			}
		)
	}	
    	
	def get(authorId:Int) = Action {
	    val data						= new ListBuffer[Map[String, JsValue]]()
	    val result:Option[AuthorRow] = getAuthorService().getAuthor(authorId)
	    
	    val author:AuthorRow = result.getOrElse(null)
	    
	    if (null != author) {

	    	data += Map(
	    		"id" 			-> Json.toJson(author.id),
	    		"firstname"		-> Json.toJson(author.firstname),
	    		"lastname"		-> Json.toJson(author.lastname)
	    	)  
	    }
	    
		Ok(Json.toJson(data))
	}
	
	def createAuthorForm(): Form[Author] = {
		val authorForm = Form(
			mapping(
		        "firstname" -> text.verifying("Firstname is required", {!_.isEmpty}),
		        "lastname" 	-> text.verifying("Lastname is required", {!_.isEmpty})
		    )(Author.apply)(Author.unapply)
		)
		
		return authorForm
	}	
	
	def searchAuthors(q:Option[String]) = Action { implicit request =>
	    val data = new ListBuffer[Map[String, JsValue]]()
	    
	    val results:Seq[(Int, String, String)] = getAuthorService().searchAuthors(q.getOrElse(""))
	    
	    for (result <- results) {
	        data += Map(
	        	"id" -> Json.toJson(result._1),
	        	"firstname" -> Json.toJson(result._2),
	        	"lastname" -> Json.toJson(result._3)
	        )
	    }

	    Ok(Json.toJson(data))
	}
	
	def authorFormTemplate = SecuredAction { implicit request =>
	    Ok(views.html.authorform(""))
	}
}