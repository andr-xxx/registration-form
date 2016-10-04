/**
 * Created by Andr on 03.10.2016.
 */


app.factory('localStorageService', ['$cookies', function ($cookies) {

   var service = {
      getLocalData: getLocalData,
      setLocalData: setLocalData,
      getObjInLocalStorage: getObjInLocalStorage

   };
   return service;

   function getLocalData(name) {
      localData = JSON.parse(localStorage.getItem(name));
      return localData;
   }

   function setLocalData(key, value) {
      localStorage.setItem(key, JSON.stringify(value));

   }

   function getObjInLocalStorage() {  // получаем из локала объект юзера по id в cookie
      var cookieId = $cookies.get('idUser');
      var localData = JSON.parse(localStorage.getItem('userDataBase'));
      for (var i = 0; i < localData.length; i++) {
         if (localData[i].id == cookieId) {
            return localData[i];
         }
      }
   }
}]);