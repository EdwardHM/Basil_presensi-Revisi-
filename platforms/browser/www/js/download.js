$(document).ready(function(){
    var popUp = document.getElementById("popUpBox");
    var button = document.getElementById("download");
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


    var select = document.getElementById('cetak-kapan');
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var bulan_tahun = month+"-"+year;
    for (var i = year - 4; i <= year + 3; i++) {
        for(var count = 0; count < 12; count++){
            var option = document.createElement('option');
            option.value = option.innerHTML = count+1+"-"+i;
            if(count+1+"-"+i == bulan_tahun) option.setAttribute('selected',true);
            select.appendChild(option);
        }

    }
    select.innerHTML += option


    console.log("Ajax Login ready");
    $("#downpdf").click(function(event){
        const user = sessionStorage.getItem('user_uuid');  
        console.log(user);
        var kapan = document.getElementById("cetak-kapan").value;
        var bulan_cetak = kapan.substring(0,1);
        var tahun_cetak = kapan.substring(2,6);
        
        $.ajax({
            url: "http://192.168.1.6/MembuatPdf/index.php",
            type: "POST",
            datatype:"json",
            crossDomain: true,
            data:JSON.stringify( { jabatan:null, cari:null, user_id:user, bln:bulan_cetak, thn:tahun_cetak } ),
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
