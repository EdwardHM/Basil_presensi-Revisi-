// var mydb = openDatabase("BasilPresensi","0.1","database untuk basil presensi", 5*1024*1024);

// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//     displayAll();
// }

//generate uuid
// function uuidv4() {
//     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//     )
//   }
 
//  //membuat table user
// if(window.openDatabase){
//     mydb.transaction(function (t){
//         t.executeSql("CREATE TABLE IF NOT EXISTS auth_user (id INTEGER PRIMARY KEY ASC, uuid TEXT, nama TEXT, username TEXT, password TEXT, created_at TEXT)");
//     });
// } else{
//     alert("websql tidak support di browser ini");
// }

// function tambah_data(){
//         var date = new Date();
//         var timeStamp= date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
//         console.log(timeStamp);

//         mydb.transaction(function (tx){
//                 var password = document.getElementById("password").value;
//                 // var confirm = document.getElementById("confirm").value;
//                 var uuid = uuidv4();
//                 var name = document.getElementById("nama").value;
//                 var phone = document.getElementById("phone").value;
              
//                 tx.executeSql("insert into auth_user(uuid,nama,username,password,created_at) values(?,?,?,?,?)",[uuid,name,phone,password,timeStamp]);
//                 alert("sukses menyimpan data user");  
//                 window.location.href = "login.html";
//         })    
// }

// function displayAll(){
//     console.log("hei hei");
//     mydb.transaction(function (tx){
//         tx.executeSql("select * from auth_user", [], function(tx, results){
//             var n = results.rows.length;
//             var s = '<table cellpadding ="2>" cellspacing="2" border="1" >';
//             for(var i = 0; i<n; i++){
//                 var biodata = results.rows.item(i);
//                 s+='<tr>';
//                 s+='<td>'+ biodata.nama+'</td>';
//                 s+='<td>'+ biodata.username+'</td>';
//                 s+='<td>'+ biodata.created_at+'</td>';
//                 s+='</tr>';
//             }
//                 s+='</table>';
//                 document.getElementById('hasil').innerHTML = s;
//         });
//     });

// }


// var pictureSource; // picture source
// var destinationType; // sets the format of returned value

// // Wait for Cordova to connect with the device
// document.addEventListener("deviceready",onDeviceReady,false);

// // Cordova is ready to be used!
// function onDeviceReady()
// {

// pictureSource=navigator.camera.PictureSourceType; destinationType=navigator.camera.DestinationType;
// }

// // Called when a photo is successfully retrieved
// function onPhotoURISuccess(imageURI) {
// options = new FileUploadOptions();

// // parameter name of file:

// options.fileKey = "my_image";

// // name of the file:

// options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

// // mime type:

// options.mimeType = "text/plain";

// params = { val1: "some value", val2: "some other value" };

// options.params = params;

// ft = new FileTransfer();

// ft.upload(imageURI, "http://192.168.1.6/upload/", success, fail, options);

// }

// function success(message) {
// alert('Your photo uploaded successfully.');
// }

// function fail(message) {
// alert('Failed because disini oi: ' + message);
// }

// function getPhoto(source) {

// // Retrieve image file location from specified source 
// navigator.camera.getPicture(onPhotoURISuccess, onFail, {

// quality: 50, destinationType: destinationType.FILE_URI, sourceType: source });

// }

// function onFail(message) {

// alert('Failed because ini: ' + message);

// }
// let app = {
//     init: function(){
//         document.getElementById('btn').addEventListener('click', app.takephoto);
//     },
//     takephoto: function(){
//         let opts = {
//             quality: 80,
//             destinationType: Camera.DestinationType.DATA_URL,
//             sourceType: Camera.PictureSourceType.CAMERA,
//             mediaType: Camera.MediaType.PICTURE,
//             encodingType: Camera.EncodingType.JPEG,
//             cameraDirection: 1,
//             targetWidth: 300,
//             targetHeight: 400
        
//         };
        
//         navigator.camera.getPicture(app.ftw, app.wta, opts);
//     },

    //jika sukses
    // ftw: function(imgURI){
        //  alert(imgURI);
        // sessionStorage.setItem('image', imgURI);
        // document.getElementById('msg').textContent = imgURI;
        //konvert base64 string ke image
    //     document.getElementById('photo').src = "data:image/jpeg;base64," +imgURI;
    //     console.log(imgURI);
    //     sessionStorage.setItem("img",imgURI);
    // },

    //jika gagal
//     wta: function(msg){
//         document.getElementById('msg').textContent = "Fail to Access The Camera";
//     }
// };

//mengecek device ready / tidak
// document.addEventListener('deviceready', app.init);


// function finalSend(){
//     console.log("sdh disini")
//     try{
//         const image = sessionStorage.getItem('img'); 
//         $.ajax({
//             url: "http://192.168.1.6/upload/upload.php",
//             type: "POST",
//             datatype:"json",
//             crossDomain: true,
//             data:JSON.stringify( { gambar:image } ),
//             cache:false,
//             processData:false,

//             success: function(result)
//             {
//                 var error = result.error;
//                 if(error){
//                     console.log("gagal menyimpan data");
//                     console.log(result.error_msg);
//                     alert(result.error_msg);
//                 }
//                 else{
//                     console.log("Anda berhasil melakukan presensi");
//                     alert("Anda berhasil melakukan presensi");  
//                 }
//             }
//         });

//     } 
//     catch(err){
//         alert("Gagal menyimpan data !");
//     }
        
// }
