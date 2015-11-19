//Started from Ming's Template on geolocation
    var myLat = 0;
    var myLng = 0;
    var myLogin = "GlendaMaletic"
    var myMessage = "2 is for tuba";
    var myRequest = new XMLHttpRequest();
    var me = new google.maps.LatLng(myLat, myLng);
    var myOptions = {
                zoom: 13, // The larger the zoom number, the bigger the zoom
                center: me,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    var map;
    var initMarker;
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
                myRequest.open("POST", "https://thawing-scrubland-7965.herokuapp.com/");
                myRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                myData = "login=" + myLogin + "&lat=" + myLat + "&lng=" + myLng + "&message=" + encodeURIComponent(myMessage);
                myRequest.send(myData);
                myRequest.onreadystatechange = function() {
                    if (myRequest.readyState == 4 && myRequest.status == 200) {
                        text = JSON.parse(myRequest.responseText);
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
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        initMarker = new google.maps.Marker({
            position: me,
            map: map,
            icon: iconBase + '/star.png',
            title: "Login: " + myLogin,
        });

        initMarker.info = new google.maps.InfoWindow({
            content: '<h1>Username:' + myLogin + '</h1>'+
                  '<div id="bodyContent">'+
                  '<p>Message: ' + myMessage + '</p>' +
                  '<p>Distance: 0 miles</p>' +
                  '</div>'
        });


        initMarker.setMap(map);
        google.maps.event.addListener(initMarker, 'click', function() {
            this.info.open(map, initMarker);
        });

        for (var k in text) {
            if(text[k].login != myLogin) {
                tempPerson = new google.maps.LatLng(text[k].lat, text[k].lng);
                var R = 3959; // Earth's radius in miles
                var lat1 = myLat * Math.PI / 180;
                var lat2 = text[k].lat * Math.PI / 180;
                var deltaLat = (text[k].lat-myLat) * Math.PI / 180;
                var deltaLng = (text[k].lng-myLng) * Math.PI / 180;

                var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                    Math.cos(lat1) * Math.cos(lat2) *
                    Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                var d = R * c;
                

                //http://stackoverflow.com/questions/3158598/google-maps-api-v3-adding-an-infowindow-to-each-marker
                var marker = new google.maps.Marker({map: map, position: tempPerson, clickable: true});

                marker.info = new google.maps.InfoWindow({
                    content: '<h1>Username: ' + text[k].login + '</h1>'+
                          '<div id="bodyContent">'+
                          '<p>Message: ' + text[k].message + '</p>' +
                          '<p>Distance: ' + d + ' miles</p>' +
                          '</div>'
                });

                google.maps.event.addListener(marker, 'click', function() {
                    var marker_map = this.getMap();
                    this.info.open(marker_map, this);
                });
            }
        }
    }



