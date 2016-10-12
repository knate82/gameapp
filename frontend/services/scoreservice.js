angular.module("GameApp")

.service("ScoreService", ["$http", function($http){
    var backend = "http://localhost:3000/scores"
    
    this.getScores = function(){
        return $http.get(backend).then(function(response){
            return response.data;
        })
    }
    
    this.addScore = function(data){
        return $http.post(backend, data).then(function(response){
            console.log(response.data);
            return response.data;
        })
    }
    
}])