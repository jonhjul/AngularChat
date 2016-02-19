angular.module("ChatApp", ["ng", "ngRoute"])
.config(function($routeProvider, $locationProvider){

  $routeProvider.when("/index",{
      templateUrl: "app/views/home.html",
      controller: "HomeCtrl"
  }).when("/rooms/:roomId",{
    templateUrl: "app/views/room.html",
    controller: "RoomCtrl"
  }).otherwise({ redirectTo: "/index"});

});

angular.module("ChatApp").controller("HomeCtrl",["$scope", "$http",
function($scope,$http){
  $scope.loggedIn = false;
  var socket = io.connect("http://localhost:8080");
  socket.on("roomlist", function(data){
      console.log(data);
  });

  $scope.nick = "";
  $scope.login = function(){
      socket.emit("adduser", $scope.nick, function(available){
        console.log(available)
      if (available){
          // The "dabs" username is not taken!
          $scope.loggedIn = true;
          socket.emit("rooms");
      }
    });
  };

  $scope.joinroom = function(){
      socket.emit("joinroom", {room: $scope.room, pass: $scope.pass }, function(canIjoin){
        console.log("canIjoin: " + canIjoin);
        socket.emit("rooms");
      });
  };

}]);

angular.module("ChatApp").controller("RoomCtrl",
["$scope", "$http",
function($scope, $http){

}]);
