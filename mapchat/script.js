//Started from Ming's Template on geolocation
            var myLat = 0;
            var myLng = 0;
            var myRequest = new XMLHttpRequest();
            var me = new google.maps.LatLng(myLat, myLng);
            var myOptions = {
                        zoom: 13, // The larger the zoom number, the bigger the zoom
                        center: me,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
            var map;
            var marker;
            var infowindow = new google.maps.InfoWindow();
            
            function init()
            {
                map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                getMyLocation();
            }
            
            function getMyLocation() {
                if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
                    navigator.geolocation.getCurrentPosition(function(position) {
                        myLat = position.coords.latitude;
                        myLng = position.coords.longitude;
                        myRequest.open("POST", "https://secret-about-box.herokuapp.com/sendLocation");
                        myRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        myData = "login=GlendaMaletic&lat=" + myLat + "&lng=" + myLng + "&message=BATMAN"
                        console.log(myData);
                        myRequest.send(myData);
                        myRequest.onreadystatechange = function() {
                            if (myRequest.readyState == 4 && myRequest.status == 200) {
                                text = JSON.parse(myRequest.responseText);
                                console.log(text);
                                renderMap();
                            }
                        }
                    });
                }
                else {
                    alert("Geolocation is not supported by your web browser.  What a shame!");
                }
            }

            function renderMap()
            {
                me = new google.maps.LatLng(myLat, myLng);
                
                // Update map and go there...
                map.panTo(me);
    
                // Create a marker
                marker = new google.maps.Marker({
                    position: me,
                    title: "Here I Am!"
                });
                marker.setMap(map);
                    
                // Open info window on click of marker
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(marker.title);
                    infowindow.open(map, marker);
                });
            }