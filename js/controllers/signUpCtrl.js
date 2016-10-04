/**
 * Created by Andr on 01.10.2016.
 */
app.controller('signUpCtrl', function ($scope, $state, CryptoService, localStorageService) {   // функция регистрация пользователя
   $scope.signUp = function () {

      $scope.user.id = getId();

      if (checkDuplicateEmail($scope)) {
         return
      }

      localStorage.setItem('userDataBase', JSON.stringify(getLocalData()));
      $state.go('login');

      function getLocalData() { //получаем данные из Local Storage и добавляем новые значения
         if (!localStorageService.getLocalData('userDataBase')) {
            $scope.user.password = CryptoService.encrypt($scope.user.password);
            var localData = [$scope.user];
            return localData
         } else {
            localData = localStorageService.getLocalData('userDataBase');
            $scope.user.password = CryptoService.encrypt($scope.user.password);
            localData.push($scope.user);
            return localData
         }
      }

      function getId() {  // получаем следующий id
         var localdata = localStorageService.getLocalData('userDataBase');
         if (!localdata) return 1;
         return ++localdata[localdata.length - 1].id
      }
   }
});
function checkDuplicateEmail(scope) { // проверяем, есть такой пользователь в базе данных. если есть - предупреждаем
   var localData = JSON.parse(localStorage.getItem('userDataBase'));
   if (!localData) {
      return
   }
   for (var i = 0; i < localData.length; i++ ) {
      if (localData[i].email == scope.user.email) {
         scope.err = true;
         return localData[i];
      } else {
         scope.err = false
      }
   }
}