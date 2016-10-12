angular.module("GameApp")

.controller("LoginController", ["$scope", "AuthService", "$location", "UserService", function($scope, AuthService, $location, UserService){
    $scope.user ={};
    
    $scope.nextPage = function(){
        
    }
    
    $scope.createUser = function(username, password){
        AuthService.createUser(username, password).then(function(response){
            UserService.user = response;
        })
    }
    
    $scope.verifyUser = function(){
        AuthService.verifyUser($scope.user).then(function(response){
            console.log(response);
            if(response != null){
                UserService.user = response;
                UserService.isLoggedIn = true;
                $location.path("/profile");
            }
        })
    }
    
}])