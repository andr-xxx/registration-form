/**
 * Created by Andr on 01.10.2016.
 */
app.controller('signUpCtrl', function ($scope, $state, CryptoService) {   // функция регистрация пользователя
   $scope.signUp = function () {

      $scope.user.id = getId();

      if (checkDuplicateEmail($scope)) {
         return
      }

      localStorage.setItem('userDataBase', JSON.stringify(getLocalData()));
      $state.go('login');

      function getLocalData() { //получаем данные из Local Storage и добавляем новые значения
         if (!localStorage.getItem('userDataBase')) {
            $scope.user.password = CryptoService.encrypt($scope.user.password).toString();
            var localData = [$scope.user];
            return localData
         } else {
            localData = JSON.parse(localStorage.getItem('userDataBase'));
            $scope.user.password = CryptoService.encrypt($scope.user.password).toString();
            console.log ($scope.user.password);
            localData.push($scope.user);
            return localData
         }
      }
      function checkDuplicateEmail(scope) { // проверяем, есть такой пользователь в базе данных. если есть - предупреждаем
         var localData = JSON.parse (localStorage.getItem('userDataBase'));
         if (!localData) {
            return
         }
         for (var i = 0; i < localData.length; i++ ) {
            if (localData[i].email == scope.user.email) {
               $scope.err = true;
               return true;
            } else {$scope.err = false}
         }
      }

      function getId() {  // получаем следующий id
         var localdata = localStorage.getItem('userDataBase');
         if (!localdata) return 1;
         localdata = JSON.parse(localdata);
         return ++localdata[localdata.length - 1].id
      }
   }
});
