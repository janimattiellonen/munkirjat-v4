package models.daos.slick

import play.api.db.slick.Config.driver.simple._
import scala.slick.jdbc.{GetResult => GR}

object DBTableDefinitions {

  case class DBUser (
    userID: String,
    firstName: Option[String],
    lastName: Option[String],
    fullName: Option[String],
    email: Option[String],
    avatarURL: Option[String]
  )

  class Users(tag: Tag) extends Table[DBUser](tag, "user") {
    def id = column[String]("userID", O.PrimaryKey)
    def firstName = column[Option[String]]("firstName")
    def lastName = column[Option[String]]("lastName")
    def fullName = column[Option[String]]("fullName")
    def email = column[Option[String]]("email")
    def avatarURL = column[Option[String]]("avatarURL")
    def * = (id, firstName, lastName, fullName, email, avatarURL) <> (DBUser.tupled, DBUser.unapply)
  }

  case class DBLoginInfo (
    id: Option[Long],
    providerID: String,
    providerKey: String
  )

  class LoginInfos(tag: Tag) extends Table[DBLoginInfo](tag, "logininfo") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def providerID = column[String]("providerID")
    def providerKey = column[String]("providerKey")
    def * = (id.?, providerID, providerKey) <> (DBLoginInfo.tupled, DBLoginInfo.unapply)
  }

  case class DBUserLoginInfo (
    userID: String,
    loginInfoId: Long
  )

  class UserLoginInfos(tag: Tag) extends Table[DBUserLoginInfo](tag, "userlogininfo") {
    def userID = column[String]("userID", O.NotNull)
    def loginInfoId = column[Long]("loginInfoId", O.NotNull)
    def * = (userID, loginInfoId) <> (DBUserLoginInfo.tupled, DBUserLoginInfo.unapply)
  }

  case class DBPasswordInfo (
    hasher: String,
    password: String,
    salt: Option[String],
    loginInfoId: Long
  )

  class PasswordInfos(tag: Tag) extends Table[DBPasswordInfo](tag, "passwordinfo") {
    def hasher = column[String]("hasher")
    def password = column[String]("password")
    def salt = column[Option[String]]("salt")
    def loginInfoId = column[Long]("loginInfoId")
    def * = (hasher, password, salt, loginInfoId) <> (DBPasswordInfo.tupled, DBPasswordInfo.unapply)
  }

  case class DBOAuth1Info (
    id: Option[Long],
    token: String,
    secret: String,
    loginInfoId: Long
  )

  class OAuth1Infos(tag: Tag) extends Table[DBOAuth1Info](tag, "oauth1info") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def token = column[String]("token")
    def secret = column[String]("secret")
    def loginInfoId = column[Long]("loginInfoId")
    def * = (id.?, token, secret, loginInfoId) <> (DBOAuth1Info.tupled, DBOAuth1Info.unapply)
  }

  case class DBOAuth2Info (
    id: Option[Long],
    accessToken: String,
    tokenType: Option[String],
    expiresIn: Option[Int],
    refreshToken: Option[String],
    loginInfoId: Long
  )

  class OAuth2Infos(tag: Tag) extends Table[DBOAuth2Info](tag, "oauth2info") {
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def accessToken = column[String]("accesstoken")
    def tokenType = column[Option[String]]("tokentype")
    def expiresIn = column[Option[Int]]("expiresin")
    def refreshToken = column[Option[String]]("refreshtoken")
    def loginInfoId = column[Long]("logininfoid")
    def * = (id.?, accessToken, tokenType, expiresIn, refreshToken, loginInfoId) <> (DBOAuth2Info.tupled, DBOAuth2Info.unapply)
  }

  val slickUsers = TableQuery[Users]
  val slickLoginInfos = TableQuery[LoginInfos]
  val slickUserLoginInfos = TableQuery[UserLoginInfos]
  val slickPasswordInfos = TableQuery[PasswordInfos]
  val slickOAuth1Infos = TableQuery[OAuth1Infos]
  val slickOAuth2Infos = TableQuery[OAuth2Infos]



  case class AuthorRow(id: Int, firstname: String, lastname: String)
  implicit def GetResultAuthorRow(implicit e0: GR[Int], e1: GR[String]): GR[AuthorRow] = GR{
    prs => import prs._
      AuthorRow.tupled((<<[Int], <<[String], <<[String]))
  }
  class Author(_tableTag: Tag) extends Table[AuthorRow](_tableTag, "author") {
    def * = (id, firstname, lastname) <> (AuthorRow.tupled, AuthorRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (id.?, firstname.?, lastname.?).shaped.<>({r=>import r._; _1.map(_=> AuthorRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id DBType(INT), AutoInc, PrimaryKey */
    val id: Column[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column firstname DBType(VARCHAR), Length(45,true) */
    val firstname: Column[String] = column[String]("firstname", O.Length(45,varying=true))
    /** Database column lastname DBType(VARCHAR), Length(45,true) */
    val lastname: Column[String] = column[String]("lastname", O.Length(45,varying=true))
  }
  lazy val Author = new TableQuery(tag => new Author(tag))

  case class BookRow(id: Int, title: String, languageId: String, pageCount: Int, isRead: Boolean, isbn: Option[String] = None, createdAt: java.sql.Timestamp, updatedAt: java.sql.Timestamp, startedReading: Option[java.sql.Timestamp] = None, finishedReading: Option[java.sql.Timestamp] = None, rating: Option[Double] = None, price: Option[scala.math.BigDecimal] = None)
  implicit def GetResultBookRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean], e3: GR[Option[String]], e4: GR[java.sql.Timestamp], e5: GR[Option[java.sql.Timestamp]], e6: GR[Option[Double]], e7: GR[Option[scala.math.BigDecimal]]): GR[BookRow] = GR{
    prs => import prs._
      BookRow.tupled((<<[Int], <<[String], <<[String], <<[Int], <<[Boolean], <<?[String], <<[java.sql.Timestamp], <<[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[java.sql.Timestamp], <<?[Double], <<?[scala.math.BigDecimal]))
  }
  class Book(_tableTag: Tag) extends Table[BookRow](_tableTag, "book") {
    def * = (id, title, languageId, pageCount, isRead, isbn, createdAt, updatedAt, startedReading, finishedReading, rating, price) <> (BookRow.tupled, BookRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (id.?, title.?, languageId.?, pageCount.?, isRead.?, isbn, createdAt.?, updatedAt.?, startedReading, finishedReading, rating, price).shaped.<>({r=>import r._; _1.map(_=> BookRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6, _7.get, _8.get, _9, _10, _11, _12)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val id: Column[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    val title: Column[String] = column[String]("title", O.Length(128,varying=true))
    val languageId: Column[String] = column[String]("language_id", O.Length(3,varying=true))
    val pageCount: Column[Int] = column[Int]("page_count")
    val isRead: Column[Boolean] = column[Boolean]("is_read")
    val isbn: Column[Option[String]] = column[Option[String]]("isbn", O.Length(40,varying=true), O.Default(None))
    val createdAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("created_at")
    val updatedAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("updated_at")
    val startedReading: Column[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("started_reading", O.Default(None))
    val finishedReading: Column[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("finished_reading", O.Default(None))
    val rating: Column[Option[Double]] = column[Option[Double]]("rating", O.Default(None))
    val price: Column[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("price", O.Default(None))
  }
  lazy val Book = new TableQuery(tag => new Book(tag))

  case class BookAuthorRow(bookId: Int, authorId: Int)
  implicit def GetResultBookAuthorRow(implicit e0: GR[Int]): GR[BookAuthorRow] = GR{
    prs => import prs._
      BookAuthorRow.tupled((<<[Int], <<[Int]))
  }
  class BookAuthor(_tableTag: Tag) extends Table[BookAuthorRow](_tableTag, "book_author") {
    def * = (bookId, authorId) <> (BookAuthorRow.tupled, BookAuthorRow.unapply)
    def ? = (bookId.?, authorId.?).shaped.<>({r=>import r._; _1.map(_=> BookAuthorRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val bookId: Column[Int] = column[Int]("book_id")
    val authorId: Column[Int] = column[Int]("author_id")

    val pk = primaryKey("book_author_PK", (bookId, authorId))

    lazy val authorFk = foreignKey("FK_9478D345F675F31B", authorId, Author)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    lazy val bookFk = foreignKey("FK_9478D34516A2B381", bookId, Book)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  lazy val BookAuthor = new TableQuery(tag => new BookAuthor(tag))


  case class GenreRow(id: Int, name: String)
  implicit def GetResultGenreRow(implicit e0: GR[Int], e1: GR[String]): GR[GenreRow] = GR{
    prs => import prs._
      GenreRow.tupled((<<[Int], <<[String]))
  }
  class Genre(_tableTag: Tag) extends Table[GenreRow](_tableTag, "genre") {
    def * = (id, name) <> (GenreRow.tupled, GenreRow.unapply)
    def ? = (id.?, name.?).shaped.<>({r=>import r._; _1.map(_=> GenreRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val id: Column[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    val name: Column[String] = column[String]("name", O.Length(45,varying=true))
  }
  lazy val Genre = new TableQuery(tag => new Genre(tag))

  case class XiTagRow(id: Int, name: String, slug: String, createdAt: java.sql.Timestamp, updatedAt: java.sql.Timestamp)
  implicit def GetResultXiTagRow(implicit e0: GR[Int], e1: GR[String], e2: GR[java.sql.Timestamp]): GR[XiTagRow] = GR{
    prs => import prs._
      XiTagRow.tupled((<<[Int], <<[String], <<[String], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  class XiTag(_tableTag: Tag) extends Table[XiTagRow](_tableTag, "xi_tag") {
    def * = (id, name, slug, createdAt, updatedAt) <> (XiTagRow.tupled, XiTagRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (id.?, name.?, slug.?, createdAt.?, updatedAt.?).shaped.<>({r=>import r._; _1.map(_=> XiTagRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val id: Column[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    val name: Column[String] = column[String]("name", O.Length(50,varying=true))
    val slug: Column[String] = column[String]("slug", O.Length(50,varying=true))
    val createdAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("created_at")
    val updatedAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("updated_at")

    val index1 = index("UNIQ_AD374A565E237E06", name, unique=true)
    val index2 = index("UNIQ_AD374A56989D9B62", slug, unique=true)
  }
  lazy val XiTag = new TableQuery(tag => new XiTag(tag))

  case class XiTaggingRow(id: Int, tagId: Option[Int] = None, resourceType: String, resourceId: String, createdAt: java.sql.Timestamp, updatedAt: java.sql.Timestamp)
  implicit def GetResultXiTaggingRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[String], e3: GR[java.sql.Timestamp]): GR[XiTaggingRow] = GR{
    prs => import prs._
      XiTaggingRow.tupled((<<[Int], <<?[Int], <<[String], <<[String], <<[java.sql.Timestamp], <<[java.sql.Timestamp]))
  }
  class XiTagging(_tableTag: Tag) extends Table[XiTaggingRow](_tableTag, "xi_tagging") {
    def * = (id, tagId, resourceType, resourceId, createdAt, updatedAt) <> (XiTaggingRow.tupled, XiTaggingRow.unapply)
    def ? = (id.?, tagId, resourceType.?, resourceId.?, createdAt.?, updatedAt.?).shaped.<>({r=>import r._; _1.map(_=> XiTaggingRow.tupled((_1.get, _2, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val id: Column[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    val tagId: Column[Option[Int]] = column[Option[Int]]("tag_id", O.Default(None))
    val resourceType: Column[String] = column[String]("resource_type", O.Length(50,varying=true))
    val resourceId: Column[String] = column[String]("resource_id", O.Length(50,varying=true))
    val createdAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("created_at")
    val updatedAt: Column[java.sql.Timestamp] = column[java.sql.Timestamp]("updated_at")

    lazy val xiTagFk = foreignKey("FK_431075D2BAD26311", tagId, XiTag)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    val index1 = index("tagging_idx", (tagId, resourceType, resourceId), unique=true)
  }
  lazy val XiTagging = new TableQuery(tag => new XiTagging(tag))


}
