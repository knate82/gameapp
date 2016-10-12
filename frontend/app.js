var app = angular.module("GameApp", ["ngRoute"])

.config(function($routeProvider){
    $routeProvider
    .when("/login", {
        templateUrl: "./login/login.html",
        controller: "LoginController"
    })
    .when("/profile", {
        templateUrl: "./profile/profile.html",
        controller: "ProfileController"
    })
    .when("/game", {
        templateUrl: "./game/game.html",
        controller: "GameController"
    })
    .otherwise("/login", {
        templateUrl: "./login/login.html",
        controller: "LoginController"
    });
})