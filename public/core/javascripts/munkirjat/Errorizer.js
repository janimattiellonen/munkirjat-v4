/**
 * @param jQuery object $containerElement
 * @param string elementClass
 * @constructor
 */
Munkirjat.Errorizer = function($containerElement, elementClass, aliases) {
    this.$containerElement  = $containerElement;
    this.elementClass       = elementClass;
    this.aliases			= aliases;
};

Munkirjat.Errorizer.prototype = (function()
{
    return {
        errorize: function(messages) {
            this.clear();
            var self = this;
            _.each(messages, function(values, key) {
                self.errorizeElement(values);
            })
        },

        errorizeElement: function(error) {
        	targetName = this.getMapping(error);
            $(this.$containerElement).addClass('errorized');
            $errorDiv = $('<div class="col-sm-offset-3 col-sm-9"></div>').addClass('errorized-message');
            $ul = $('<ul></ul>');
            $ul.append($('<li></li>').text(error.message));

            $errorDiv.html($ul);
            	
            $item = $('*[name="' + targetName + '"]', this.$containerElement).closest("." + this.elementClass);
            $item.append($errorDiv);
        },

        
        
        clear: function() {
            $(this.$containerElement).find('.errorized-message').remove();
        },
        
        getMapping: function(error) {
        	var value = _.filter(this.aliases, function(item) {

        		return item.key === error.key;
        	}, error);
        	
        	var retVal = value.length === 1 ? value[0].alias : error.key;
        	return retVal;
        }
    }
})();