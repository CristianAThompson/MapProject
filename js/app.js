function testError() {
    // error function for Google Maps API if it cannot load
    var error = document.createElement('p'),
        errorTxt = document.createTextNode("Can't connect with Google Maps API. Try again later.");
    error.appendChild(errorTxt);
    var errorBox = document.getElementById("injectError");
    errorBox.appendChild(error);
    errorBox.style.backgroundColor = "#D9534F";
    errorBox.style.fontSize = "30px";
    errorBox.style.textAlign = "center";
    errorBox.style.padding = "30px";
}


var map;
var markers = [];
var urls;
var sourceURL;
var populateInfoWindow;

function initMap() {

    var viewModel = function() {

        var self = this;
				//Define the style of the map
				var styles = [
			    {
			        "featureType": "administrative",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#716464"
			            },
			            {
			                "weight": "0.01"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative.country",
			        "elementType": "labels",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape.natural",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape.natural.landcover",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "labels.text",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "poi.attraction",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            },
			            {
			                "color": "#a05519"
			            },
			            {
			                "saturation": "-13"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "transit.station",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            },
			            {
			                "color": "#84afa3"
			            },
			            {
			                "lightness": 52
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            }
			        ]
			    }
			];

        var mapDiv = document.getElementById('map');
        // stores  <div id='map'></div> element variable

        self.map = new google.maps.Map(mapDiv, {
            // creates and stores new map object
            mapTypeId: google.maps.MapTypeId.HYBRID,
            center: {
                lat: 41.8796149,
                lng: -87.6223267
            },
						style: styles
        });

        // stores and creates locations array for map variables
        self.locations = [
					{title: 'Battle of the Granicus River', location: {lat: 40.0267276, lng: 27.0541123}, wiki: "Battle_of_the_Granicus", pageid: 746024},
					{title: 'Siege of Halicarnassus', location: {lat: 37.032088, lng: 27.430485}, wiki: "Siege_of_Halicarnassus", pageid: 20474118},
					{title: 'Battle of Issus', location: {lat: 36.8474414, lng: 36.2003325}, wiki: "Battle_of_Issus", pageid: 227322},
					{title: 'Siege of Tyre', location: {lat: 33.269792, lng: 35.193262}, wiki: "Siege_of_Tyre_(332_BC)", pageid: 1194909},
					{title: 'Siege of Gaza', location: {lat: 31.504591, lng: 34.46334}, wiki: "Siege_of_Gaza", pageid: 15296493},
					{title: 'Battle of Gaugamela', location: {lat: 36.854746, lng: 42.972445}, wiki: "Battle_of_Gaugamela", pageid: 241926},
					{title: 'Battle of the Persian Gate', location: {lat: 30.6877486, lng: 51.6165331}, wiki: "Battle_of_the_Persian_Gate", pageid: 10462539}
        ];

        self.lock = new ko.observableArray(locations);
        // creates and stores new observable array from locations array

        self.query = new ko.observable('');
        // creates new observable to use with data-bind in search form

        var largeInfoWindow = new google.maps.InfoWindow();
        // creates info infowindow object to use later

        var bounds = new google.maps.LatLngBounds();
        // creates bounds object to use later, forces map to constrain to markers

        for (var i = 0; i < locations.length; i++) {
            // loop over locations array and assign variables for key/value pairs
            var position = locations[i].location;
            var title = locations[i].title;
            var pageid = locations[i].pageid;
            var wiki = locations[i].wiki;
            var marker = new google.maps.Marker({
                // create marker object with locations array info
                map: map,
                position: position,
                title: title,
                pageid: pageid,
                wiki: wiki,
                icon: "markers/museum_war.png",
                animation: google.maps.Animation.DROP
            });

            self.lock()[i].marker = marker;
            // creates a variable for each marker to can be referred to in rest of application

            bounds.extend(marker.position);
            map.fitBounds(bounds);
            // forces the map to constrain to marker position

            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfoWindow);
                bounceMarker(this);
            });
            // click listener for markers to bounce and show info window

            window.onresize = function() {
                map.fitBounds(bounds);
            };
            populateInfoWindow = function(marker, infowindow) {
                sourceURL = 'https://en.wikipedia.org/wiki/' + marker.wiki;
                // variable for source link
                urls = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.wiki;
                // url variable for wikipedia api returning only extract, is fed into ajax call

                if (infowindow.marker != marker) {
                    infowindow.marker = marker;
                    infowindow.open(map, marker);

                    $.ajax({
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {},
                        url: urls
                    }).done(function(response) {
                        infowindow.setContent('<div>' + marker.title + '</div>');
												document.getElementById('clicked-content').innerHTML = ('<div>' + response.query.pages[marker.pageid].extract + '  <br>(Source: ' + '<a href=' + sourceURL + ' target="_blank">Wikipedia)</a>' + '</div>');
                        // sets infowindow content on marker click

                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        infowindow.setContent('<div>' + 'Service Currently Unavailable (Try again later)' + '</div>');
                    });
                    infowindow.addListener('closeclick', function() {
                        largeInfoWindow.close();
                    });
                }
            };
        }


        self.bounceMarker = function(marker) {
            // function called when marker is clicked
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 700);
            map.setZoom(14);
            map.panTo(marker.getPosition());
        };

        self.filtered = ko.computed(function(lock) {
            var filter = self.query().toLowerCase();
            // variable tracks what the user enters into search form
            if (!filter) {

                self.lock().forEach(function(x) {
                    x.marker.setVisible(true);
                    map.setZoom(7);
                    map.fitBounds(bounds);

                });
                return self.lock();
                // when filter is empty display all markers and center
            } else {
                return ko.utils.arrayFilter(self.lock(), function(locale, marker) {
                    // utility function searches thru array and returns matches based on user input
                    var ref = locale.title.toLowerCase().indexOf(filter);
                    locale.marker.setVisible(true);
                    if (ref !== -1) {
                        return locale.title.toLowerCase().indexOf(filter) !== -1;
                    }
                    if (ref == -1 || 0) {
                        locale.marker.setVisible(false);
                        largeInfoWindow.close();
                    }
                });

            }
        });

        this.clicky = function(marker) {
            // locations click binding function executed in view
            var self = this;
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.marker.setAnimation(null);
            }, 750);
            populateInfoWindow(self.marker, largeInfoWindow);
            map.setZoom(14);
            map.setCenter(self.marker.getPosition());
        };

        this.reset = function() {
            // click binding executed in view that resets map
            largeInfoWindow.close();
            map.setZoom(7);
            map.fitBounds(bounds);

        };
    };

    ko.applyBindings(viewModel);

}
