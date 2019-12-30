$(document).ready(function(){
    console.log("Ajax Login ready");
    $("#download").click(function(event){
        const user = sessionStorage.getItem('user_uuid');  
        console.log(user);

        
        $.ajax({
            url: "http://192.168.1.6/MembuatPdf/index.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { user_id:user } ),
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
                    console.log("terdownload");
                    alert("Anda berhasil mendownload"); 
                    window.location.href = "http://192.168.1.6/MembuatPdf/FPDF/"+user+".pdf"; 
                }
            }
        });
        return false;
    });
});

// function openpdf(){
//     const user = sessionStorage.getItem('user_uuid'); 
//     window.location.href = "http://192.168.1.6/MembuatPdf/FPDF/"+user+".pdf";
// }
