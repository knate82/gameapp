angular.module("GameApp")

.controller("ProfileController", ["$scope", "UserService", "ScoreService", "$location", function($scope, UserService, ScoreService, $location){
    
    $scope.user = UserService.user;
    if(UserService.isLoggedIn === false){
        $location.path("/login");
    }
    
    $scope.playGame = function(){
        $location.path("/game");
    }
    
    $scope.highScores = [];
    
    $scope.getScores = function(){
        ScoreService.getScores().then(function(response){
            $scope.highScores.push(response);
        })
    }
    
    $scope.getScores();
    
    console.log($scope.highScores);
    
}])