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

function finalSend(){
    console.log("sdh disini")
    try{
        var is_in_office = sessionStorage.getItem('office'); 
        var radius = sessionStorage.getItem('radius'); 
        const user = sessionStorage.getItem('user_uuid'); 
        const hadir = sessionStorage.getItem('hadir');
        const office = sessionStorage.getItem('office');  
        const lokasi = sessionStorage.getItem('lokasi')

        // jika di office
        if(is_in_office == "true"){
            if(radius == "ok"){
                if(hadir = "presensi"){
                    var date = new Date();
                    var timeStamp= date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
                    console.log(timeStamp);

                    $.ajax({
                        url: "http://192.168.1.2/API_Basil_Revisi/absensi.php",
                        type: "POST",
                        datatype:"json",
                        crossDomain: true,
                        data:JSON.stringify( { user_id:user, keterangan:hadir , is_in_office:office, lokasi:lokasi} ),
                        cache:false,
                        processData:false,

                        success: function(result)
                        {
                            var error = result.error;
                            if(error){
                                console.log("gagal menyimpan data");
                                console.log(result.error_msg);
                                alert(result.error_msg);
                            }
                            else{
                                console.log("Anda berhasil melakukan presensi");
                                alert("Anda berhasil melakukan presensi");  
                            }
                        }
                    });
                } 
                else {
                    alert("Anda berada di kantor, silakan pilih keterangan 'Presensi Kehadiran (dalam kantor)'");
                    window.location.href = "absensi.html";
                }    
            } 
            
            else{
                alert("Anda Diluar jangkauan 100m dari kantor! Pilih anda sedang tidak berada di kantor");
                window.location.href = "absensi.html";
            }
        } 
        // end jika di office

        //jika diluar 
        else{
            if(radius =="nope"){
                if(hadir != "presensi"){
                    var date = new Date();
                    var timeStamp= date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
                    console.log(timeStamp);
    
                    $.ajax({
                        url: "http://192.168.1.2/API_Basil_Revisi/absensi.php",
                        type: "POST",
                        datatype:"json",
                        crossDomain: true,
                        data:JSON.stringify( { user_id:user, keterangan:hadir , is_in_office:office, lokasi:lokasi } ),
                        cache:false,
                        processData:false,
    
                        success: function(result)
                        {
                            var error = result.error;
                            if(error){
                                console.log("gagal menyimpan data");
                                console.log(result.error_msg);
                                alert(result.error_msg);
                            }
                            else{
                                console.log("Anda berhasil melakukan presensi");
                                alert("Anda berhasil melakukan presensi");  
                            }
                        }
                    });
                } else {
                    alert("Anda tidak berada di kantor, silahkan pilih keterangan selain 'Presensi Kehadiran (dalam kantor)'");
                    window.location.href = "absensi.html";
                }     
            } 

            else{
                alert("Anda masih dalam jangkauan 100m dari kantor, disarankan untuk memilih 'di kantor' ");
                window.location.href = "absensi.html";
            }
        }

    } 
    catch(err){
        alert("Gagal menyimpan data !");
    }
        
}

function displayAll(){
    console.log("display all");
    const uuiduser = sessionStorage.getItem('user_uuid');

    $.ajax({
        url         : "http://192.168.1.2/API_Basil_Revisi/history.php",
        type        : "GET",
        dataType    : "json",
        crossDomain: true,
        cache:false,
        processData:false,
        success     : function(result){
            console.log(result);
            
            //menghitung jumlah data history
           const jmlData = result["num"];
           console.log(jmlData);

           if(jmlData > 0){
            var s = '<table cellpadding ="2>" cellspacing="2" border="1" >';
            s+= '<tr>'+'<th>'+"uuid_user"+'</th>'+'<th>'+"lokasi"+'</th>'+'<th>'+"kondisi"+'</th>'+'<th>'+"login_at"+'</th>'+'</tr>';
            for(var i = 0; i < jmlData; i++){
                var hasil = result["records"][i];
                 s+='<tr>';
                 s+='<td>'+ hasil["keterangan"]+'</td>';
                 s+='<td>'+ hasil["lokasi"]+'</td>';
                 s+='<td>'+ hasil["is_in_office"]+'</td>';
                 s+='<td>'+ hasil["created_at"]+'</td>';
                 s+='</tr>';
             }
             
             s+='</table>';
             document.getElementById('hasil').innerHTML = s;
           } else {
            document.getElementById('hasil').innerHTML = "Anda belum memiliki history presensi"; 
           }
           
            
        }         
    });
}


function logOut(){
    sessionStorage.clear();
    window.location.href = "login.html";
}


