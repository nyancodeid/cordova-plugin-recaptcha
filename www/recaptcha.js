var exec = require('cordova/exec');

// Old es5 method version of the plugin for plain cordova projects.
var recaptcha = {
  verify: function(api_key, callback, fail) {
    exec(function(result) {
        if (typeof callback === 'function')
          callback(result);
      }, function(error) {
        if (typeof fail === 'function')
          fail(error);
      },
      'Recaptcha', 'verify', [api_key]
    );
  }
};

// Similar method to ionic-native, add the service if ng1 is active here.
if (window.angular) {
  window.angular
    .module('cordova.recaptcha', [])
    .service('$cordovaRecaptcha', ['$q', function($q){
      return {
        verify: function(site_key) {
          var deferred = $q.defer();

          recaptcha.verify(site_key,
            function(response) {
              deferred.resolve(response);
            },
            function(error) {
              deferred.reject(error);
            });

          return deferred.promise;
        }
      };
    }])
}

module.exports = recaptcha;
