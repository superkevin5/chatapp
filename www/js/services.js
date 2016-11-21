angular.module('starter.services', [])
  .factory('Sessions', function($rootScope, cookieStore, COOKIE_DOMAINS) {

    var SessionAPI = {

      get: function (key) {
        return cookieStore.get(key);
      },
      remove: function(key) {
        cookieStore.remove(key, { path : '/', domain : COOKIE_DOMAINS });
      },

      // other methods have been removed for brevity

      destroy: function (message) {
        user = {};
        this.remove('id');
        this.remove('token');
        this.remove('expiresAt');
        this.remove('role');
        this.remove('authType');
        $rootScope.$emit('session:destroy', { message: message });
      }
    };
    return SessionAPI;
  })
  .factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
