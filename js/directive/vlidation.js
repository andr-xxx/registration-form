
// директива валидации паролей при регистрации
app.directive('checkPass', function() {
   return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
         ctrl.$validators.checkPass = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) {
               return true;
            }
            if (!scope.user) {
               return false
            }

            if (scope.user.password === viewValue) {
               // it is valid
               return true;
            }
            // it is invalid
            return false;
         };
      }
   };
});