app.controller('profileCtrl', function ($scope, CryptoService, localStorageService, $timeout) {
   var userData = localStorageService.getObjInLocalStorage();

   $scope.user = { // заполняем значение user
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: CryptoService.decrypt(userData.password),
      id: userData.id
   };

   $scope.save = function () {

      $scope.user.password = CryptoService.encrypt($scope.user.password);

      var localData = localStorageService.getLocalData('userDataBase');
      localData.splice($scope.user.id - 1, 1, $scope.user);   // поиск реализован по id. массив данных упорядочен по id,
                                                               // ищем и заменяем данные в Local Storage на новые
                                                               // поэтому проблемм нет. удаление данных из массива не предусмотренно
      localStorageService.setLocalData('userDataBase', localData);
      $scope.user.password = CryptoService.decrypt(localStorageService.getObjInLocalStorage().password);  // выводим незашифрованный пароль
      $scope.dataSave = true;
      $timeout (function () {
         $scope.dataSave = false
      }, 2000)
   };
   localStorageService.getLocalData('userDataBase')


});