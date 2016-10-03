/**
 * Created by Andr on 29.09.2016.
 */
var app = angular.module('registrApp', ['ui.router', 'ngCookies']);  //подключение модуля и зависимостей



app.config(function($stateProvider, $urlRouterProvider) {
   // Любые неопределенные url перенаправлять на /welcome
   $urlRouterProvider.otherwise("/welcome");
   // Теперь определим состояния
   $stateProvider
      .state('login', {
         url: "/login",
         templateUrl: "views/login.html",
         controller: 'loginCtrl'
      })
      .state('signUp', {
         url: "/signUp",
         templateUrl: "views/signUp.html",
         controller: 'signUpCtrl'
      })
      .state('homePage', {
         url: "/welcome",
         templateUrl: "views/welcome.html"
      })
      // .state ('profile/:userId', {
      //    url: "/myProfile",
      //    templateUrl: "views/myProfile.html",
      //    controller: 'profileCtrl',
      //    authenticate: true
      // })
      .state ('myProfile', {
         url: "/myProfile",
         templateUrl: "views/myProfile.html",
         controller: 'profileCtrl',
         authenticate: true
      })
});

// проверка прав доступа
app.run(['$rootScope', '$state', '$cookies', function($rootScope, $state, $cookies) {
   $rootScope.$on('$stateChangeStart', function(event, next) {
      // перенаправить на домашнюю страницу, если пользвоатель не зарегестрирован
      if (next.authenticate && !$cookies.get('idUser')) {
         alert ('access is denied');
         event.preventDefault();
         $state.go('login');
      }
   });
}]);

