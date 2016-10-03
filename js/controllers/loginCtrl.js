/**
 * Created by Andr on 01.10.2016.
 */



app.controller('loginCtrl', function ($scope, $cookies, $state, CryptoService) {
   //
   $scope.login = function () {
      var user = getUser($scope);
      if (!user) {
         return $scope.err = true;  // выведем подсказку неправильного пароля или email
      }
      $scope.err = false;  // уберём её, при правильном вводе
      $cookies.put('idUser', user.id);  // храним в куках id user-а, по нему же и авторизируем

      $state.go('myProfile')
   };
   function getUser(scope) {  // проверяем данные, которые ввёл пользователь, и если совпадают с local storage то возвращаем
      // объект пользователя
      var localData = JSON.parse (localStorage.getItem('userDataBase'));
      if (!localData) {
         //если база данных пуста роутим пользователя на страницу регистрации
         $state.go('signUp');
         return
      }
      for (var i = 0; i < localData.length; i++ ) {
         if (localData[i].email == scope.user.email && CryptoService.decrypt(localData[i].password) == scope.user.password) {
            return localData[i];
         }
      }
   }
});
