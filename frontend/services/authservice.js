angular.module("GameApp")

.service("AuthService",["$http", function($http){
    var backend = ("http://localhost:3000/user/");
    
    this.verifyUser = function(user){
        return $http.post(backend + "login", user).then(function(response){
            return response.data;
        })
    }
    
    this.createUser = function(username, password){
        var userCred = {
            userName: username,
            password: password
        };
        return $http.post(backend, userCred).then(function(response){
            return response.data;
        })
    }
    
}])