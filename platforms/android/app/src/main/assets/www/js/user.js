document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady(){
   var nama_user = sessionStorage.getItem("username");
   document.getElementById('nama').innerHTML = nama_user;
   var telepon = sessionStorage.getItem("phone");
   document.getElementById('telp').innerHTML = telepon;

      // popup  nama
   var popUp = document.getElementById("popUpBox");
   var button = document.getElementById("ganti1");
   var close = document.getElementById("close");

   button.onclick = function(){
      popUp.style.display ="block";
   }

   close.onclick = function(){
      popUp.style.display = "none";
   }

   window.onclick = function(){
      if(event.target == this.popUp){
         popUp.style.display = "none";
      }
   }
   
   // popup 2 password
   var popUp2 = document.getElementById("popUpBox2");
   var button2 = document.getElementById("ganti");
   var close2 = document.getElementById("close2");

   button2.onclick = function(){
      popUp2.style.display ="block";
   }

   close2.onclick = function(){
      popUp2.style.display = "none";
   }

   window.onclick = function(){
      if(event.target == this.popUp2){
         popUp2.style.display = "none";
      }
   }


      // popup 3 telp
   var popUp3 = document.getElementById("popUpBox3");
   var button3 = document.getElementById("ganti2");
   var close3 = document.getElementById("close3");

   button3.onclick = function(){
      popUp3.style.display ="block";
   }

   close3.onclick = function(){
      popUp3.style.display = "none";
   }

   window.onclick = function(){
      if(event.target == this.popUp3){
         popUp3.style.display = "none";
      }
   }
}

// Update Password
function changePass(){
   var passBaru1 = document.getElementById("passwordBaru").value;
   var passBaru2 = document.getElementById("passwordBaru2").value;
   var user =     sessionStorage.getItem('user_uuid');
   console.log(passBaru2);
   if(passBaru1 != passBaru2){
       alert("Gagal Memperbarui Password!");
   }
   else{
       $.ajax({
           url: "http://192.168.1.6/API_Basil_Revisi/update_user.php",
           type: "POST",
           datatype:"json",
           crossDomain: true,
           data:JSON.stringify( { pass_Baru:passBaru2, user_id:user } ),
           cache:false,
           processData:false,

           success: function(result)
           {
               var error = result.error;
               if(error){
                   console.log("gagal");
                   console.log(result.error_msg);
                   alert(result.error_msg);
               }
               else{
                   alert("Berhasil Memperbarui Password!");
                   window.location.href = "profile.html";
               }
           }
       });
       return false;
   }
}


// Update Profile lainnya
function changeProf(){
   var telpBaru = document.getElementById("telpBaru").value;
   var user =     sessionStorage.getItem('user_uuid');
   if(telpBaru != null){
       $.ajax({
           url: "http://192.168.1.6/API_Basil_Revisi/update_profile.php",
           type: "POST",
           datatype:"json",
           crossDomain: true,
           data:JSON.stringify( { nama_Baru:null, telp_baru:telpBaru, user_id:user } ),
           cache:false,
           processData:false,

           success: function(result)
           {
               var error = result.error;
               if(error){
                   console.log("gagal");
                   console.log(result.error_msg);
                   alert(result.error_msg);
               }
               else{
                   alert("Berhasil Memperbarui Telepon!");
                   window.location.href = "profile.html";
               }
           }
       });
       return false;
   } else{
      alert("No. Telepon Tidak Boleh Kosong !");
   }
}


// Update Profile lainnya
function cobaProf(){
   console.log("coba coba ");
   var namaBaru = document.getElementById("namaBaru").value;
   var user =     sessionStorage.getItem('user_uuid');
  console.log(namaBaru);

  if(namaBaru != ""){
      $.ajax({
         url: "http://192.168.1.6/API_Basil_Revisi/update_profile.php",
         type: "POST",
         datatype:"json",
         crossDomain: true,
         data:JSON.stringify( { "nama_Baru":namaBaru, "telp_baru":"", "user_id":user } ),
         cache:false,
         processData:false,

         success: function(result)
         {
            alert("sukses");
            //  var error = result.error;
            //  console.log("ERROR bro");
            //  if(error){
            //      console.log("gagal");
            //      console.log(result.error_msg);
            //      alert(result.error_msg);
            //  }
            //  else{
            //     console.log("Sukses pembaruan");
            //      sessionStorage.setItem('username',namaBaru);
            //      alert("Berhasil Memperbarui Nama!");
            //      window.location.href = "profile.html";
            //  }
         }, error:function(e){
                 sessionStorage.setItem('username',namaBaru);
                 alert("Berhasil Memperbarui Nama!");
                 window.location.href = "profile.html";
         }


     });
      alert(namaBaru);
  }
  else{
      alert("Nama Tidak Boleh Kosong !");
  }

   // if(namaBaru != ""){
   //    $.ajax({
   //       url: "http://10.4.50.19/API_Basil_Revisi/update_profile.php",
   //       type: "POST",
   //       datatype:"json",
   //       crossDomain: true,
   //       data:JSON.stringify( { "nama_Baru":namaBaru, "telp_baru":"", "user_id":user } ),
   //       cache:false,
   //       processData:false,

   //       success: function(result)
   //       {
   //           var error = result.error;
   //           console.log("ERROR bro");
   //           if(error){
   //               console.log("gagal");
   //               console.log(result.error_msg);
   //               alert(result.error_msg);
   //           }
   //           else{
   //              console.log("Sukses pembaruan");
   //               sessionStorage.setItem('username',namaBaru);
   //               alert("Berhasil Memperbarui Nama!");
   //               window.location.href = "profile.html";
   //           }
   //       }
   //   });
   // //   return false;      
   // }
   // else {
   //     alert("Nama Tidak Boleh Kosong !");
   // }
}


function logOut(){
   sessionStorage.clear();
   window.location.href = "login.html";
}