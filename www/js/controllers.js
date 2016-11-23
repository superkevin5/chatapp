angular.module('starter.controllers', ['starter.services'])

  .controller('DashCtrl', function ($scope) {
  })
  .controller('LoginCtrl', function ($scope, $cookies, $state) {

    // if (!!$cookies.get('accessToken')) {
    //   console.log($cookies.get('accessToken'));
    //   $state.go('tab.dash');
    // }

    $scope.FBLogin = function () {
      console.log('Login please');
      FB.login(function (response) {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information');
          FB.api('/me', function (response) {
            console.log(response);
            console.log('Good to see you,' + response.name + '.');
            var accessToken = FB.getAuthResponse().accessToken;
            $cookies.put('accessToken', accessToken);
            $state.go('tab.dash');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
          $cookies.remove('accessToken');
        }
      }, {
        scope: 'user_photos'
      });
    };
  })


  .controller('ChatsCtrl', ['$scope', 'Chats', function ($scope, Chats, Sessions) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  }])

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('PhotosCtrl', function ($scope, $stateParams, $ionicActionSheet, $timeout, $cookies, $q) {
    // Triggered on a button click, or some other target
    $scope.photos = [];
    $scope.albums = [];
    $scope.name = 'aa';
    $scope.show = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '<b>Share</b> This'},
          {text: 'Move'}
        ],
        destructiveText: 'Delete',
        titleText: 'Modify your album',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function () {
        hideSheet();
      }, 2000);

    };


    $scope.getAlbums = function () {
      var qarray = [];
      FB.api(
        '/me/albums',
        {fields: 'id,cover_photo'},
        function (albumResponse) {
          var i, album;
          for (i = 0; i < albumResponse.data.length; i++) {
            album = albumResponse.data[i];
            $scope.albums.push(album);
          }

          for (var i = 0; i < $scope.albums.length; i++) {
            qarray.push($scope.getPhotosForAlbumId($scope.albums[i].id));
          }
          $q.all(qarray).then(function (values) {
            for (var i = 0; i < values.length; i++) {
              for (var j = 0; j < values[i].length; j++) {
                $scope.photos.push(values[i][j]);
              }
            }
          });
        }
      );
    };

    $scope.makeFacebookPhotoURL = function (id, accessToken) {
      return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
    };
    $scope.getPhotosForAlbumId = function (albumId) {

      var defer = $q.defer();
      FB.api(
        '/' + albumId + '/photos',
        {fields: 'id'},
        function (albumPhotosResponse) {
          var photos = [];
          for (var i = 0; i < albumPhotosResponse.data.length; i++) {
            var facebookPhoto = albumPhotosResponse.data[i];
            photos.push({
              'id': facebookPhoto.id,
              'added': facebookPhoto.created_time,
              'url': $scope.makeFacebookPhotoURL(facebookPhoto.id, $cookies.get('accessToken'))
            });
          }
          defer.resolve(photos);
        }
      );
      return defer.promise;
    };

    $scope.getPhotos = function () {
      $scope.photos = [];
      $scope.getAlbums();
    };

  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
