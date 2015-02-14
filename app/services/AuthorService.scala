package services

import scala.slick.driver.MySQLDriver.simple._
import models.Author
import models.daos.slick.DBTableDefinitions._
import models.daos.slick.DBTableDefinitions.{Author => AuthorTable}
import scala.slick.jdbc.StaticQuery
import scala.slick.jdbc.StaticQuery.interpolation
import scala.slick.jdbc.{GetResult, StaticQuery => Q}


class AuthorService(val authors:TableQuery[AuthorTable], val bookAuthors:TableQuery[BookAuthor], db: Database) {
    
	def createAuthor(authorData: Author):Int = {
	    
	    db.withSession { implicit session =>                  
	        val authorId:Int = (authors returning authors.map(_.id)) += createAuthorRowForInsert(authorData)

	        authorId
        }
	}
	
	def updateAuthor(authorId: Int, authorData: Author) = {
	    db.withSession { implicit session => 
	        authors.where(_.id === authorId).update(createAuthorRowForUpdate(authorId, authorData))
	    }
	}
	
	def searchAuthors(term:String):Seq[(Int, String, String)] = {
	    db.withSession { implicit session =>            
	        val query = for {
			        author <- authors if author.firstname.like(term + "%") || author.lastname.like(term + "%")
			    } yield (author.id, author.firstname, author.lastname)
			
			    query.run
      }
	}
	
	def getAuthor(authorId:Int):Option[AuthorRow] = {
	    db.withSession { implicit session => 
	        authors.filter{ _.id === authorId }.firstOption
	    }
	}
	
	def createAuthorRowForInsert(authorData:Author):AuthorRow = {
        createAuthorRow(0, authorData)
  	}
	
	def createAuthorRowForUpdate(authorId:Int, authorData:Author):AuthorRow = {
        createAuthorRow(authorId, authorData)
  	}
		
	def createAuthorRow(authorId:Int, authorData:Author):AuthorRow = {
        AuthorRow(
        	authorId,
        	authorData.firstname,
        	authorData.lastname
        )
	}

    def getAuthors(limit: Int = 0): List[(Int, String, String, Int)] = {
        val processedLimit:Int = getLimitValue(limit)

        val query = sql"""
            SELECT
              a.id,
              a.firstname,
              a.lastname,
              count(b.id) AS amount
            FROM
              book b LEFT JOIN book_author ba ON b.id = ba.book_id
              RIGHT JOIN author a ON a.id = ba.author_id
            WHERE
              a.firstname IS NOT NULL AND a.lastname IS NOT NULL
            GROUP BY
              a.id
            ORDER BY
              lastname ASC, firstname ASC
            LIMIT $processedLimit"""
            .as[(Int, String, String, Int)]

        db.withSession { implicit session =>
            query.list
        }
    }

    def getLimitValue(limit: Int): Int = {
        limit match {
            case x if x <= 0 => 100000
            case _ => limit
        }
    }
}