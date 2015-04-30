var React               = require('react');

var AboutView = React.createClass({

    render: function() {
        return (
            <div>
                <article>
                    <h1>About</h1>

                    <p>This is a personal virtual bookshelf created for helping me figuring out, whether I own a certain book or not.</p>

                    <p>I read and buy quite a lot of books and sometimes it is a bit hard to remember, if I have a certain book already as I might have over 10 books from a certain author.</p>

                    <h2>Why?</h2>

                    <p>I could certainly have just produced a simple list of all my books but that's not fun to code, is it. ;)

                    </p><p>I wanted to create a web app that I have use for and that is fun to code and helps me to learn new stuff.</p>

                    <h2>History</h2>

                    <h3>Munkirjat v3.5</h3>

                    <ul>
                        <li><a target="_blank" href="http://www.scala-lang.org/">Scala</a></li>
                        <li><a target="_blank" href="https://www.playframework.com/">Play Framework</a></li>
                        <li><a target="_blank" href="http://facebook.github.io/react/">React</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                    </ul>

                    <h3>Munkirjat v3</h3>
                    <ul>
                        <li><a target="_blank" href="http://www.scala-lang.org/">Scala</a></li>
                        <li><a target="_blank" href="https://www.playframework.com/">Play Framework</a></li>
                        <li><a target="_blank" href="https://angularjs.org/">AngularJS</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                    </ul>


                    <h3>Munkirjat v2</h3>

                    <ul>
                        <li><a target="_blank" href="http://symfony.com/">Symfony2</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 2</a></li>
                        <li><a target="_blank" href="http://php.net">PHP 5.4</a></li>
                        <li><a target="_blank" href="http://backbonejs.org">Backbone.js</a></li>
                        <li><a target="_blank" href="http://coffeescript.org">CoffeeScript</a></li>
                        <li><a target="_blank" href="http://www.lesscss.org">Less</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                    </ul>


                    <h3>Munkirjat v1.5</h3>
                    
                    <ul>
                        <li><a target="_blank" href="http://framework.zend.com">Zend Framework 1</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 2</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                    </ul>
                    
                    <h3>Munkirjat v1</h3>
                    
                    <ul>
                        <li><a target="_blank" href="http://framework.zend.com">Zend Framework 1</a></li>
                        <li><a target="_blank" href="http://www.doctrine-project.org">Doctrine 1</a></li>
                        <li><a target="_blank" href="http://www.mysql.com">MySql</a></li>
                    </ul>
                </article>
            </div>
        );
    },
});

module.exports = AboutView;