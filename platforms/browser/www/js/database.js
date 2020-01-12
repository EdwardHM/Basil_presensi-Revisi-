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


