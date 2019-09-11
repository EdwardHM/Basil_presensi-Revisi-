var mydb = openDatabase("biodata","0.1","biodata peserta workshop", 5*1024*1024);

function login()
{

    mydb.transaction(matchcred)

    function matchcred(tx)
    {
        var username=document.getElementById("username").value;
        tx.executeSql('SELECT * from person Where nama = "'+ username+ '"', [], MatchPass, errorCB1);
    }


    function MatchPass(tx, results)
    {
        try{
            var orgnalPass=results.rows.item(0).password;  
        }catch(err){
           alert("name not found")
        }
      
        var userinputedPass=document.getElementById("password").value;

        if(orgnalPass==userinputedPass)
        {
            window.location.href = "absensi.html";
        }
        else
        {
            errorCB();
        }
    }

    function errorCB(tx,err)
    {
        alert("Password is not valid !");
        document.getElementById("username").value="";
        document.getElementById("password").value="";
    }

    function errorCB1()
    {
        alert("Query failed");
    }

    function errorCB2(tx,err)
    {
        alert("errorCB2"+err);
    }
}