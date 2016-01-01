import React from 'react';
import Immutable from 'immutable';

export default React.createClass({

	render() {
        return (
            <div className="component">
                <article>
                    <h1>About</h1>

                    <p>This is a personal virtual bookshelf created for helping me figuring out, whether I own a certain book or not.</p>

                    <p>I read and buy quite a lot of books and sometimes it is a bit hard to remember, if I have a certain book already as I might have over 10 books from a certain author.</p>

                    <h2>Why?</h2>

                    <p>I could certainly have just produced a simple list of all my books but that's not fun to code, is it. ;)

                    </p><p>I wanted to create a web app that I have use for and that is fun to code and helps me to learn new stuff.</p>
                    
                    <h2>History</h2>

                    <h3>Munkirjat v4 (current version)</h3>

                    <p>The development process of the previous version was really, really slow and when I was introduced to React, well, bye bye Scala. Of course, I could just have replaced AngularJS with React and still have Scala, but I also decided to, once again, rewrite the backend. This time using node.js.</p>


                    <ul className="use-dots">
                        <li><a target="_blank" href="https://facebook.github.io/react/">React</a></li>
                        <li><a target="_blank" href="http://nodejs.org/">Node.js</a></li>
                        <li><a target="_blank" href="http://restify.com/">Restify</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                        <li><a target="_blank" href="http://www.lesscss.org">Less</a></li>
                        <li><a target="_blank" href="http://en.wikipedia.org/wiki/Single-page_application">Single-page application</a>
                    </li></ul>

                    <h3>Munkirjat v3</h3>

                    <p>This was a rather unfortunate version. I originally intended to rewrite and continue using Scala as the backend language. First together with AngularJs and later on with React.</p>

                    <p>I struggled through with Scala even though I hardly knew the language. I really took it on as a learning process this time. I successfully released a Scala/AngularJS version but it was quite rawish and lacked some of the old features.</p>
                    
                    <ul className="use-dots">
                        <li><a target="_blank" href="http://www.scala-lang.org/">Scala</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                        <li><a target="_blank" href="https://angularjs.org/">AngularJS</a></li>
                        <li><a target="_blank" href="http://www.lesscss.org">Less</a></li>
                        <li><a target="_blank" href="http://en.wikipedia.org/wiki/Single-page_application">Single-page application</a>
                    </li></ul>

                    <h3>Munkirjat v2</h3>
                    
                    <ul>
                        <li><a target="_blank" href="http://symfony.com/">Symfony2</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 2</a></li>
                        <li><a target="_blank" href="http://php.net">PHP 5.4</a></li><a target="_blank" href="http://php.net">
                        </a><li><a target="_blank" href="http://php.net"></a><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                        <li><a target="_blank" href="http://backbonejs.org">Backbone.js</a></li>
                        <li><a target="_blank" href="http://coffeescript.org">CoffeeScript</a></li>
                        <li><a target="_blank" href="http://www.lesscss.org">Less</a></li>
                    </ul>
                    
                    
                    <h3>Munkirjat v1.5</h3>
                    
                    <ul>
                        <li><a target="_blank" href="http://framework.zend.com">Zend Framework 1</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 2</a></li>
                    </ul>
                    
                    <h3>Munkirjat v1</h3>
                    
                    <ul>
                        <li><a target="_blank" href="http://framework.zend.com">Zend Framework 1</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 1</a></li>
                    </ul>
                </article>
            </div>
        );
	} 
});