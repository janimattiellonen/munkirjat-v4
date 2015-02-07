var Munkirjat = Munkirjat || {};

i18n.init({lng: 'en', resGetPath: '/assets/core/locales/en/translation.json'});


Munkirjat.Notifier = (function() {
  function Notifier() {}

  Notifier.information = function(message) {
    return this.createMessage(message, 'information');
  };

  Notifier.success = function(message) {
    return this.createMessage(message, 'success');
  };

  Notifier.alert = function(message) {
    return this.createMessage(message, 'alert');
  };

  Notifier.error = function(message) {
    return this.createMessage(message, 'error');
  };

  Notifier.warning = function(message) {
    return this.createMessage(message, 'warning');
  };

  Notifier.notification = function(message) {
    return this.createMessage(message, 'notification');
  };

  Notifier.createMessage = function(message, type) {
    return noty({
      text: message,
      type: type,
      timeout: 1000,
      dismissQueue: true,
      layout: 'center',
      theme: 'defaultTheme'
    });
  };

  return Notifier;

})();

Munkirjat.ArrayUtils = (function() {
    function ArrayUtils() {}

    ArrayUtils.chunk = function(src, chunkSize) {
        var arr = [];

        for (var i = 0; i < src.length; i += chunkSize) {
            arr.push(src.slice(i, i + chunkSize));
        }

        return arr;
    }

    return ArrayUtils;

})();