app.controller('profileCtrl', function ($scope, $cookies, CryptoService) {
   var userData = getObjInLocalStorage();

   $scope.user = { // заполняем значение user
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: CryptoService.decrypt(userData.password),
      id: userData.id
   };

   $scope.save = function () {
      $scope.user.password = CryptoService.encrypt($scope.user.password).toString();
      localData = JSON.parse (localStorage.getItem ('userDataBase'));
      localData.splice ($scope.user.id - 1, 1, $scope.user);   // поиск реализован по id. массив данных упорядочен по id,
                                                               // поэтому проблемм нет. удаление данных из массива не предусмотренно
      localStorage.setItem('userDataBase', JSON.stringify(localData));
      $scope.user.password = CryptoService.decrypt(getObjInLocalStorage().password);  // выводим на незашифрованный пароль
   };
   function getObjInLocalStorage() {  // получаем из локала объект юзера по id в cookie
      var cookieId = $cookies.get('idUser');
      var localData = JSON.parse (localStorage.getItem ('userDataBase'));
      for (var i = 0; i < localData.length; i++) {
         if (localData[i].id == cookieId) {
            return localData[i];
         }
      }
   }
});