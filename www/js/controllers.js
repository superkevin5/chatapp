angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope) {})
.controller('LoginCtrl', function($scope) {

  $scope.FBLogin = function () {
    console.log('Login please');
    FB.login(function (response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information');
        FB.api('/me', function (response) {
          console.log('Good to see you,' + response.name + '.');
          console.log(response);

          var accessToken = FB.getAuthResponse().accessToken;

        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };
})


.controller('ChatsCtrl', ['$scope','Chats',function($scope, Chats, Sessions) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PhotosCtrl', function($scope, $stateParams, $ionicActionSheet, $timeout) {
  // Triggered on a button click, or some other target
  $scope.show = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<b>Share</b> This' },
        { text: 'Move' }
      ],
      destructiveText: 'Delete',
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        return true;
      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 2000);

  };

  $scope.show();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
