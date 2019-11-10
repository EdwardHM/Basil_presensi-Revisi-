function sendData() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost/mahasiswa_API/register.php";

    var data = JSON.stringify({
        nama: document.getElementById("nama").value,
        email: document.getElementById("phone").value,
        password: document.getElementById("password").value,
    });

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {               
        console.log (this.responseText);
    };

    xhr.send(data);
    return false;
}