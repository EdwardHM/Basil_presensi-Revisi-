var mydb = openDatabase("BasilPresensi","0.1","database untuk basil presensi", 5*1024*1024);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    displayAll()

    //get default kondisi radio button kondisi
    var kon = document.getElementById("kantor").value;
    console.log("default",kon)
    sessionStorage.setItem('office', kon);

    //get default kondisi radio button kehadiran
    var har = document.getElementById("hadir").value;
    console.log("default",har)
    sessionStorage.setItem('hadir', har);


}

//untuk mendapatkan nilai baru dari radio button kondisi
function myFunction(kondisi) {
    document.getElementById("tampung").value = kondisi;
    console.log("now",kondisi)
    sessionStorage.setItem('office', kondisi);
  }

//untuk mendapatkan nilai baru dari radio button jenis
function jpresensi(kehadiran) {
    document.getElementById("tampunghadir").value = kehadiran;
    console.log("now",kehadiran)
    sessionStorage.setItem('hadir', kehadiran);
  }


//generate uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
 
 //membuat table history 
if(window.openDatabase){
    mydb.transaction(function (t){
        t.executeSql("CREATE TABLE IF NOT EXISTS presensi(id INTEGER PRIMARY KEY ASC, uuid TEXT,uuid_user TEXT, is_in_office TEXT, lokasi TEXT, kondisi TEXT, created_at TEXT)");
    });
} else{
    alert("websql tidak support di browser ini");
}

function finalSend(){
    try{
        var is_in_office = sessionStorage.getItem('office'); 
        var radius = sessionStorage.getItem('radius'); 

        if(is_in_office == "true"){
            if(radius == "ok"){
                var date = new Date();
                var timeStamp= date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
                console.log(timeStamp);

                     mydb.transaction(function (tx){
                        var uuid = uuidv4();
                        const uuiduser = sessionStorage.getItem('user_uuid'); 
                        const lokasi = sessionStorage.getItem('lokasi');  
                        const kehadiran = sessionStorage.getItem('hadir'); 
                        tx.executeSql("insert into presensi(uuid,uuid_user,is_in_office,lokasi,kondisi,created_at) values(?,?,?,?,?,?)",[uuid,uuiduser,is_in_office,lokasi,kehadiran,timeStamp]);
                    })

                alert("Anda berhasil melakukan presensi");  

            } 
            
            else{
                alert("Anda Diluar jangkauan 100m dari kantor !");
                window.location.href = "absensi.html";
            }

        } 
        
        else{
            if(radius =="nope"){
                var date = new Date();
                var timeStamp= date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
                console.log(timeStamp);

                     mydb.transaction(function (tx){
                        var uuid = uuidv4();
                        const uuiduser = sessionStorage.getItem('user_uuid'); 
                        const lokasi = sessionStorage.getItem('lokasi');  
                        const kehadiran = sessionStorage.getItem('hadir'); 
                        tx.executeSql("insert into presensi(uuid,uuid_user,is_in_office,lokasi,kondisi,created_at) values(?,?,?,?,?,?)",[uuid,uuiduser,is_in_office,lokasi,kehadiran,timeStamp]);
                     })

                alert("Anda berhasil melakukan presensi");  

            } else{
                alert("Anda masih dalam jangkauan 100m dari kantor, disarankan untuk memilih 'di kantor' ");
                window.location.href = "absensi.html";
            }
        }

    } catch(err){
        alert("Gagal menyimpan data !");
    }
        
}

function displayAll(){
    console.log("hei hei");
    const uuiduser = sessionStorage.getItem('user_uuid');
    mydb.transaction(function (tx){
        tx.executeSql('select * from presensi WHERE uuid_user = "'+uuiduser+ '"', [], function(tx, results){
            var n = results.rows.length;
            var s = '<table cellpadding ="2>" cellspacing="2" border="1" >';
            s+= '<tr>'+'<th>'+"uuid_user"+'</th>'+'<th>'+"lokasi"+'</th>'+'<th>'+"kondisi"+'</th>'+'<th>'+"login_at"+'</th>'+'</tr>';
            for(var i = 0; i<n; i++){
                var hasil = results.rows.item(i);
                s+='<tr>';
                s+='<td>'+ hasil.uuid_user+'</td>';
                s+='<td>'+ hasil.lokasi+'</td>';
                s+='<td>'+ hasil.kondisi+'</td>';
                s+='<td>'+ hasil.created_at+'</td>';
                s+='</tr>';
            }
                s+='</table>';
                document.getElementById('hasil').innerHTML = s;
        });
    });
}


function logOut(){
    sessionStorage.clear();
    window.location.href = "login.html";
}


