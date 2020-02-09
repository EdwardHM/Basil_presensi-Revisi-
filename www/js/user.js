document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady(){
   var nama_user = sessionStorage.getItem("username");
   document.getElementById('nama').innerHTML = nama_user;
   var telepon = sessionStorage.getItem("phone");
   document.getElementById('telp').innerHTML = telepon;
}

