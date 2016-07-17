var map;

// Create a new blank array for all the listing markers.
var markers = [];

// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;

//Create an array to use in multiple functions to have control over the number of
//places that show
var placeMarkers = [];

// These are the locations that will be shown to the user.
var locations = [
	{title: 'Sweetgrass Bakery', location: {lat: 46.589938,lng: -112.038616}},
	{title: 'Park Avenue Bakery', location: {lat: 46.586355,lng: -112.040753}},
	{title: 'Cafe Zydeco', location: {lat: 46.5961329,lng: -112.034301}},
	{title: 'Suds Hut', location: {lat: 46.6128834,lng: -112.0211412}},
	{title: 'Jade Garden', location: {lat: 46.6170219,lng: -112.0211496}},
	{title: 'MacKenzie River Pizza Co.', location: {lat: 46.6181675,lng: -112.0211826}}
];

function initMap() {
	// Create a styles array to use with the map.
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
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 46.5933366, lng: -112.0857337},
		zoom: 10,
		styles: styles,
		mapTypeControl: false
	});

	//Create a searchbox in order to execute a places searchbox
	var searchBox = new google.maps.places.SearchBox(
		document.getElementById('places-search'));
	//Bias the searchbox to within the bounds of the maps
	searchBox.setBounds(map.getBounds());

	var largeInfowindow = new google.maps.InfoWindow();
		// Style the markers a bit. This will be our listing marker icon.
	var defaultIcon = makeMarkerIcon('0091ff');
	// Create a "highlighted location" marker color for when the user
	// mouses over the marker.
	var highlightedIcon = makeMarkerIcon('FFFF24');
	// The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < locations.length; i++) {
		// Get the position from the location array.
		var position = locations[i].location;
		var title = locations[i].title;

		console.log(getPlacesDetails(position, largeInfowindow));
		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});
		// Push the marker to our array of markers.
		markers.push(marker);

		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		});
		// Two event listeners - one for mouseover, one for mouseout,
		// to change the colors back and forth.
		marker.addListener('mouseover', function() {
			this.setIcon(highlightedIcon);
		});
		marker.addListener('mouseout', function() {
			this.setIcon(defaultIcon);
		});
	}

	showMarkers();

	//Listen for the event fired when the user selects a prediction and clicks "go"
	document.getElementById('go-places').addEventListener('click', textSearchPlaces);

}

// This function will loop through the markers array and display them all.
function showMarkers() {
	var bounds = new google.maps.LatLngBounds();
	// Extend the boundaries of the map for each marker and display the marker
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
		// Clear the infowindow content to give the streetview time to load.
		infowindow.setContent('' + marker.title + '');
		infowindow.marker = marker;
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});
		}
		// Open the infowindow on the correct marker.
		infowindow.open(map, marker);
}

// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
	return markerImage;
}

//This function fires when the user selects a searchbox picklist item
//it will do a nearby search using the selected query string or place
function searchBoxPlaces(searchBox) {
	hideMarkers(placeMarkers);
	var places = searchBox.getPlaces();
	//For each place, get the icon, name and location
	createMarkersForPlaces(places);
	if (places.length == 0) {
		window.alert('We did not find any places matching that search!');
	}
}

//This function fires when the user selects go on the places search
//It will do a nearby search using the entered query string or places
function textSearchPlaces() {
	var bounds = map.getBounds();
	hideMarkers(placeMarkers);
	var placesService = new google.maps.places.PlacesService(map);
	placesService.textSearch({
		query: document.getElementById('places-search').value,
		bounds: bounds
	}, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			createMarkersForPlaces(results);
		}
	});
}

//This function creates markers for each place found in either places search
function createMarkersForPlaces(places) {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < places.length; i++) {
		var place = places[i];
		var icon = {
			url: place.icon,
			size: new google.maps.Size(35, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(15, 34),
			scaledSize: new google.maps.Size(25, 25)
		};
		// Create a marker for each place.
		var marker = new google.maps.Marker({
			map: map,
			icon: icon,
			title: place.name,
			position: place.geometry.location,
			id: place.place_id
		});
		// Create a single infowindow to be used with the place details information
		// so that only one is open at once.
		var placeInfoWindow = new google.maps.InfoWindow();
		// If a marker is clicked, do a place details search on it in the next function.
		marker.addListener('click', function() {
			if (placeInfoWindow.marker == this) {
				console.log("This infowindow already is on this marker!");
			} else {
				getPlacesDetails(this, placeInfoWindow);
			}
		});
		placeMarkers.push(marker);
		if (place.geometry.viewport) {
			// Only geocodes have viewport.
			bounds.union(place.geometry.viewport);
		} else {
			bounds.extend(place.geometry.location);
		}
	}
	map.fitBounds(bounds);
}

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
var service = new google.maps.places.PlacesService(map);
service.getDetails({
	placeId: marker.id
}, function(place, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		// Set the marker property on this infowindow so it isn't created again.
		infowindow.marker = marker;
		var innerHTML = '<div>';
		if (place.name) {
			innerHTML += '<strong>' + place.name + '</strong>';
		}
		if (place.formatted_address) {
			innerHTML += '<br>' + place.formatted_address;
		}
		if (place.formatted_phone_number) {
			innerHTML += '<br>' + place.formatted_phone_number;
		}
		if (place.opening_hours) {
			innerHTML += '<br><br><strong>Hours:</strong><br>' +
					place.opening_hours.weekday_text[0] + '<br>' +
					place.opening_hours.weekday_text[1] + '<br>' +
					place.opening_hours.weekday_text[2] + '<br>' +
					place.opening_hours.weekday_text[3] + '<br>' +
					place.opening_hours.weekday_text[4] + '<br>' +
					place.opening_hours.weekday_text[5] + '<br>' +
					place.opening_hours.weekday_text[6];
		}
		if (place.photos) {
			innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
					{maxHeight: 100, maxWidth: 200}) + '">';
		}
		innerHTML += '</div>';
		infowindow.setContent(innerHTML);
		infowindow.open(map, marker);
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});
	}
});
}
