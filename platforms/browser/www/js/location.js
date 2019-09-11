 document.addEventListener("deviceready", onDeviceReady, false);
 
            function onDeviceReady(){
                console.log("location ready");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
                
                // manggil cek mock location
                // window.plugins.mocklocation.check(successCallback, errorCallback);
            }

            //cek ada mock location
            // function successCallback(result) {
            //     console.log(result); // true - enabled, false - disabled
            //     if(result =="false"){
            //         console.log("mock location disable");
            //     } else{
            //         sessionStorage.clear();
            //         alert("Please turn off / disable the mock location");
            //         window.location.href = "absensi.html";
            //     }
            //   }
            //   function errorCallback(error) {
            //     console.log(error);
            //   }
       
            // function getData(){
            //     navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
            // }

            function onSuccess(position){
                 var loc = document.getElementById("lok");
                
                //  Get latitiude & longitude Position berdasarkan location
                 var lat_send =position.coords.latitude;
                 var long_send =position.coords.longitude;
                 console.log("lat",position.coords.latitude);
                 console.log(position.coords.longitude);
                 sessionStorage.setItem('lat', lat_send);   
                 sessionStorage.setItem('long', long_send);
              
                    var latlng = position.coords.latitude+","+position.coords.longitude;

                    // konversi kan ke alamat lokasi
                    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +latlng+ "&key=AIzaSyDhGU-wSjC89hoHPStx7bYGOjHpULJQHGI";
                    $.getJSON(url, function (data) {
                        var route = "",
                        street_number = "",
                        kelurahan = "",
                        kecamatan = "",
                        kota = "",
                        provinsi = "",
                        negara = "",
                        pos = "";
                        for (var i = 0; i < data.results[0].address_components.length; i++) {
                            var addr = data.results[0].address_components[i];
                            if (addr.types[0] == 'street_number') 
                            street_number = addr.short_name;
                            else if (addr.types[0] == 'route')
                            route= addr.short_name;
                            else if (addr.types[0] == 'administrative_area_level_4')
                            kelurahan = addr.short_name;
                            else if (addr.types[0] == ['administrative_area_level_3'])
                            kecamatan = addr.short_name;
                            else if (addr.types[0] == ['administrative_area_level_2'])
                            kota = addr.short_name;
                            else if (addr.types[0] == ['administrative_area_level_1'])
                            provinsi = addr.short_name;
                            else if (addr.types[0] == ['country'])
                            negara = addr.long_name;
                            else if (addr.types[0] == ['postal_code'])
                            pos = addr.short_name;
                        }
                        loc.innerHTML = "Anda sedang berada di : "+ route +" No."+ street_number+", "+ kelurahan + ", "+ kecamatan+", "+kota+", "+provinsi+" "+ pos + ", " + negara;  
                    });
                }

            function onError(err){
                console.log("error");
                alert("Please turn on / allow the location");
                window.location.href = "absensi.html";
            }