/**
 * Created by Andr on 01.10.2016.
 */
app.controller('headerCtrl', function ($scope, $rootScope, $state, $cookies) {  // делаем меню. $scope.base имитируют данные с сервера
   $scope.one = [
      {name: 'Home', url: '#welcome'},
      {name: 'Log In', url: '#login'},
      {name: 'Sign up', url: '#signUp'}
   ];
   $scope.two = [
      {name: 'My profile', url: '#myProfile'},
      {name: 'Log Out', url: '#'}
   ];

   $scope.getBase  = function () {
      if ($cookies.get('idUser')) {
         return $scope.two
      } else if (!$cookies.get('idUser')) {
         return $scope.one;
      }
   };


   $scope.logOut = function (event) {  // обрабатываем событие выхода из аккаунта
      $state.go('homePage');
      $cookies.remove('idUser');
   };
});