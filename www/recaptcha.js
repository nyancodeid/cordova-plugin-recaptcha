var recaptcha = {
  verify: function(api_key, callback, fail) {
    if (!cordova || !cordova.exec) {
      fail('Cannot find Cordova');
      return;
    }

    cordova.exec(function(result) {
      if (typeof callback === 'function') {
        callback(result);
      }
    }, function(error) {
      if (typeof fail === 'function') {
        fail(error);
      }
    },
    'Recaptcha', 'verify', [api_key]
    );
  },
};

if (window.angular) {
  window.angular
    .module('cordova.recaptcha', [])
    .service('$cordovaRecaptcha', ['$q', function($q) {
      return {
        verify: function(site_key) {
          var deferred = $q.defer();

          recaptcha.verify(
            site_key,
            function(response) {
              deferred.resolve(response);
            },
            function(error) {
              deferred.reject(error);
            }
          );

          return deferred.promise;
        },
      };
    }]);
}

module.exports = recaptcha;
