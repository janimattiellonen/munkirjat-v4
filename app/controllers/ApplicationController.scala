package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.contrib.services.CachedCookieAuthenticator
import com.mohiva.play.silhouette.core.{Environment, LogoutEvent, Silhouette}
import forms._
import models.User
import play.api._
import play.api.libs.json.{Json, JsValue}
import play.api.mvc._
import scala.collection.mutable.ListBuffer
import scala.concurrent.Future
import scala.slick.driver.MySQLDriver.simple._

/**
 * The basic application controller.
 *
 * @param env The Silhouette environment.
 */
class ApplicationController @Inject() (implicit val env: Environment[User, CachedCookieAuthenticator])
  extends Silhouette[User, CachedCookieAuthenticator] {

  def index = UserAwareAction { implicit request =>
    Ok(views.html.index(request.identity))
  }

  /**
   * Handles the Sign In action.
   *
   * @return The result to display.
   */
  def signIn = UserAwareAction.async { implicit request =>
    request.identity match {
      case Some(user) => Future.successful(Redirect(routes.ApplicationController.index))
      case None => Future.successful(Ok(views.html.signIn(SignInForm.form)))
    }
  }

  /**
   * Handles the Sign Up action.
   *
   * @return The result to display.
   */
  def signUp = UserAwareAction.async { implicit request =>
    Future.successful(Forbidden("Registration is forbidden"))
  }

  /**
   * Handles the Sign Out action.
   *
   * @return The result to display.
   */
  def signOut = SecuredAction.async { implicit request =>
    env.eventBus.publish(LogoutEvent(request.identity, request, request2lang))
    Future.successful(env.authenticatorService.discard(Redirect(routes.ApplicationController.index)))
  }

  def privileges = UserAwareAction.async { implicit request =>
    val base:List[String] = List(
      "author:get",
      "author:search",
      "book:get",
      "stats:stats",
      "stats:currently-reading",
      "stats:latest-read",
      "stats:latest-added",
      "stats:favourite-authors",
      "stats:recently-read",
      "stats:unread",
      "templates:home",
      "templates:about",
      "templates:login"
    )

    val privileged:List[String] = List(
      "author:create",
      "author:update",
      "author:edit",
      "book:create",
      "book:update",
      "book:edit",
      "templates:author-form",
      "templates:book-form"
    )

    request.identity match {
      case Some(user) => Future.successful(Ok(Json.toJson(base ++ privileged)))
      case None => Future.successful(Ok(Json.toJson(base)))
    }
  }

  def homeTemplate = Action {
    /*
      scala.slick.codegen.SourceCodeGenerator.main(
        Array("scala.slick.driver.MySQLDriver", "com.mysql.jdbc.Driver", "jdbc:mysql://localhost/munkirjat_scala?user=root&password=&characterEncoding=UTF-8", "models", "model", "root", "")
      )
      */
    Ok(views.html.home(""))
  }

  def aboutTemplate = Action {
    Ok(views.html.about(""))
  }

  def bookTemplate = Action {
    Ok(views.html.book(""))
  }

  def loginTemplate = Action {
    Ok(views.html.loginform(""))
  }
}
