$(document).ready(function(){
    console.log("Ajax Register ready");
    $("#register").click(function(event){
        // const nama = $('#nama').val();
        // const phone = $('#phone').val();
        // const password = $('#password').val();
        // console.log(nama);
        // console.log(phone);
        // console.log(password);
        event.preventDefault();
        $.ajax({
            url: "http://192.168.1.2/API_Basil_Revisi/register.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { nama: $('#nama').val(), phone: $('#phone').val(), password: $('#password').val() } ),
            cache:false,
            beforeSend: function(){
                $('#errormessage_reg').html("");
            },
            processData:false,


            success: function(result)
            {
                var error = result.error;
                if(error){
                    console.log("gagal register");
                    console.log(result.error_msg);
                    $('#errormessage_reg').html(result.error_msg);
                }
                else{
                    console.log("berhasil register");
                    alert("berhasil register");
                    // lanjut ke halaman berikutnya
                    window.location.href = "login.html";
                }
            }
        });
        return false;
    });
});

