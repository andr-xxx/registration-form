app.factory('CryptoService', [CryptoService]); //библиоткека шифрования

function CryptoService() {
   var secretKey = "secretKey";

   var service = {
      encrypt: encrypt,
      decrypt: decrypt
   };

   return service;

   function encrypt(data) {
      return CryptoJS.AES.encrypt(data, secretKey).toString();
   }

   function decrypt(text) {
      var bytes  = CryptoJS.AES.decrypt(text.toString(), secretKey);
      var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      return decryptedData;
   }
}
