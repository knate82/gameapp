angular.module("GameApp")

.controller("GameController", ["$scope", "GameService", "UserService", "ScoreService", "$location", function ($scope, GameService, UserService, ScoreService, $location) {
    
    $scope.user = UserService.user;
    if(UserService.isLoggedIn === false){
        $location.path("/login");
    }
    
    $scope.runGame = function(){
        GameService.startGame();
    }
    
    $scope.runGame();

}])