angular.module('starter.services', [])
  .factory('APIInterceptor', function($q, $injector) {

    var APIInterceptor = {
      // On request success
      request: function(config) {
        //Return the config or wrap it in a promise if blank.
        return config || $q.when(config);
      },

      // On request failure
      requestError: function(rejection) {
        //  console.log('$httpInterceptor2',rejection); // Contains the data about the error on the request.

        // Return the promise rejection.
        return $q.reject(rejection);
      },

      // On response success
      response: function(response) {
        //    console.log('$httpInterceptor3',response); // Contains the data from the response.

        // Return the response or promise.
        return response || $q.when(response);
      },

      // On response failture
      responseError: function(rejection,$cookies) {

        // This will capture all HTTP errors such as 401 errors so be careful with your code. You can however
        // examine the "rejection" object so you can add more filtering

        if (rejection.data.status === 401) {
          var Session = $injector.get('Session');
          Session.destroy('Your token has expired!'); // See Session factory below
        }

        $cookies.remove('accessToken');
        // Return the promise rejection.
        return $q.reject(rejection);
      }
    };
    return APIInterceptor;
  });
