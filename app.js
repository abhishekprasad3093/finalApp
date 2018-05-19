var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {
    $scope.userNotFound = false;
    $scope.found = false;
    $scope.showUserDetails = false;
    $scope.users = {};
    $scope.username = '';
    $scope.getGitInfo = function () {
      if ($scope.username) {
        $http.get(" https://api.github.com/search/users?q=" + $scope.username + '&client_id=' + 'd9308aacf8b204d361fd'
          + '&client_secret=' + '62551cc02cee983fff0bac41baf170eb5a312c1c')
          .success(function (data) {
            $scope.users = data;
            $scope.found = true;
            $scope.userNotFound = false;
          })
          .error(function () {
            $scope.userNotFound = true;
          });
      }
    }

    $scope.showUser = function(user){
      $scope.showUserDetails = true;
      $scope.userNotFound = false;
      $scope.found = false;
      $scope.user =  user;
      $scope.userDetails = {};
      
      $http.get("https://api.github.com/users/" + user.login + '?client_id=' + 'd9308aacf8b204d361fd'
          + '&client_secret=' + '62551cc02cee983fff0bac41baf170eb5a312c1c')
          .success(function (data) {
            $scope.userDetails.user = data;
          })
          .error(function () {
           
          });
      

      $http.get('https://api.github.com/users/' + user.login
      + '/repos?client_id=' + 'd9308aacf8b204d361fd'
      + '&client_secret=' + '62551cc02cee983fff0bac41baf170eb5a312c1c'  )
          .success(function (data) {
            $scope.userDetails.repos = data;
          })
          .error(function () {
           
          });
      
    }
  });