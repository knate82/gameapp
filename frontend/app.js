var app = angular.module("GameApp", ["ngRoute"])

.config(function($routeProvider){
    $routeProvider
    .when("/login", {
        templateUrl: "./login/login.html",
        controller: "LoginController"
    })
    .when("/profile/:username", {
        templateUrl: "./profile/userprofile.html",
        controller: "UserProfileController"
    })
    .otherwise("/login", {
        templateUrl: "./login/login.html",
        controller: "LoginController"
    });
})