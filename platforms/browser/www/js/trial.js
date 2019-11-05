$(document).ready(function(){
    console.log("ajax ready");
    $("#trial").click(function(){

        //mengirimkan data username dan password dan me-return data user beserta jwt token
        // $.ajax({ 
        //     url: 'http://127.0.0.1:8888/signin',
        //     dataType: 'json',
        //     contentType : "application/json",
        //     method : 'POST',
        //     cache: false,
        //     data: JSON.stringify( { "name": $('#nama').val(),
        //      "kontak": $('#phone').val(),"status": $('anggota').val(), "password": $('#password').val() } ),
        //     processData: false,

        //     success : function(result){            
        //         if(result["status"] == "success"){
        //          alert("sukses bro")
        //         } else{
        //             alert("gagal bro");
        //         }
        //     }
        // });

            $.ajax({
                type: 'GET',
                url: "http://192.168.1.6/api_presensi_basil/trial.php",
                success:function(result){
                 if(result["status"]  == "success"){
                    alert("berhasil koneksi dengan api")
                 } else{
                     alert("coba lagi");
                 }
                }
            });
    });
});  