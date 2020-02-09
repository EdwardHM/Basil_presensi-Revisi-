 document.addEventListener("deviceready", onDeviceReady, false);
 
            function onDeviceReady(){
                console.log("location ready");
                navigator.geolocation.getCurrentPosition(onSuccess, onError,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });               
            }

            function onSuccess(position){
                 var loc = document.getElementById("lok");
                 var tam = document.getElementById("tampung2");
                
                //  Get latitiude & longitude Position berdasarkan location
                 var lat_send =position.coords.latitude;
                 var long_send =position.coords.longitude;
                 console.log("lat",lat_send);
                 console.log(long_send);
                //  sessionStorage.setItem('lat', lat_send);   
                //  sessionStorage.setItem('long', long_send);

                 var radius_bumi = parseFloat("6372.795477598");
                 var lat_tujuan = parseFloat("-7.95853"); //vernon office
                 var long_tujuan = parseFloat("112.6374568");
                //  var lat_send =position.coords.latitude;-7.9580384 
                //  var long_send =position.coords.longitude; 112.6378245
                //  console.log(position.coords.latitude);
                //  console.log(position.coords.longitude);
              
                 var del_lat = lat_send - lat_tujuan;
                 var del_long = long_send - long_tujuan;
                 var alpha = del_lat / 2 ;
                 var beta = del_long /2;
                 console.log("del_lat", del_lat);
                 console.log("del_long", del_long);
                 console.log("alpha", alpha);
                 console.log("beta", beta);

                 //degree to radiant
                 var pi = Math.PI;
                 var tal = alpha*(pi/180);
                 var tol = beta*(pi/180);

                 console.log("tal", tal);
                 console.log("tol", tol);
              
                 //radius
                 //lat a = asal (send), latb = tujuan
                 var steins = Math.sin(tal) * Math.sin(tal) + Math.cos(lat_send) * Math.cos(lat_tujuan) * Math.sin(tol) * Math.sin(tol) ;
                 // console.log(steins);
                 var c = Math.asin(Math.min(1, Math.sqrt(steins)));
                 // var d = Math.asin(c);
                 var jarak = 2 * radius_bumi * c;
                 var bul_jarak =  Math.round(jarak.toFixed(4)*10)*100;
                 

                 console.log("c",c);
                 console.log("steins",steins);
                 console.log("jarak", jarak);
                 console.log("bul", bul_jarak); 

                 //cek apakah bisa akses ke absensi
                    if(bul_jarak < 100){
                        var status = "ok";
                        sessionStorage.setItem('radius',status)
                    }else{
                        var status = "nope";
                        sessionStorage.setItem('radius',status)
                    }
              
                var latlng = lat_send+","+long_send;

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
                        var lokasi = "Anda sedang berada di : "+ route +" No."+ street_number+", "+ kelurahan + ", "+ kecamatan+", "+kota+", "+provinsi+" "+ pos + ", " + negara; 
                        loc.innerHTML = lokasi;
                        sessionStorage.setItem('lokasi',lokasi)
                    });
                }

            function onError(err){
                console.log("error");
                alert("Please turn on / allow the location");
                window.location.href = "absensi.html";
            }