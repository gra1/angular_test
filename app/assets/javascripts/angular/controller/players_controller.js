var angApp = angular.module('angApp', ['ngRoute', 'ngResource', 'ui.bootstrap']); 

//Factory
angApp.factory('Players', ['$resource',function($resource){
  return $resource('/players.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

angApp.factory('Player', ['$resource', function($resource){
  return $resource('/players/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

//Controller
angApp.controller("PlayerListCtr", ['$scope', '$http', '$resource', 'Players', 'Player', '$location', function($scope, $http, $resource, Players, Player, $location) {

  $scope.players = Players.query();

  $scope.deletePlayer = function (playerId) {
    if (confirm("Are you sure you want to delete this player?")){
      Player.delete({ id: playerId }, function(){
        $scope.players = Players.query();
        $location.path('/');
      });
    }
  };

  $scope.sortField = undefined;
  $scope.reverse = false;

  $scope.sort = function(fieldName){
    if($scope.sortField == fieldName){
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.sortField = fieldName;
      $scope.reverse = false;
    }
  };
  
  $scope.currentPage = 1;
  $scope.itemsPerPage = 3;
}]);

angApp.controller("PlayerUpdateCtr", ['$scope', '$resource', 'Player', '$location', '$routeParams', function($scope, $resource, Player, $location, $routeParams) {
  $scope.player = Player.get({id: $routeParams.id})
  $scope.update = function(){
    if ($scope.playerForm.$valid){
      Player.update({id: $scope.player.id},{player: $scope.player},function(){
        $location.path('/');
      }, function(error) {
        console.log(error)
      });
    }
  };
}]);

angApp.controller("PlayerAddCtr", ['$scope', '$resource', 'Players', '$location', function($scope, $resource, Players, $location) {
  $scope.player = {};
  $scope.save = function () {
    if ($scope.playerForm.$valid){
      Players.create({player: $scope.player}, function(){
        $location.path('/');
      }, function(error){
        console.log(error)
      });
    }
  };
}]);

//Routes
angApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/players',{
      templateUrl: '/templates/players/index.html',
      controller: 'PlayerListCtr'
    });
    $routeProvider.when('/players/new', {
      templateUrl: '/templates/players/new.html',
      controller: 'PlayerAddCtr'
    });
    $routeProvider.when('/players/:id/edit', {
      templateUrl: '/templates/players/edit.html',
      controller: "PlayerUpdateCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/players'
    });
  }
]);

