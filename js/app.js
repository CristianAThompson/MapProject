var map;

// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Battle_of_the_Granicus_River
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Siege_of_Halicarnassus
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Battle_of_Issus
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Siege_of_Tyre_(332_BC)
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Siege_of_Gaza
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Battle_of_Gaugamela
// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Battle_of_the_Persian_Gate

//stores the information within the model to be displayed on the map
var Model = function() {
	var self = this;
	self.places = ko.observableArray([
		{title: 'Battle of the Granicus River', location: {lat: 40.0267276, lng: 27.0541123}, wiki: "Battle_of_the_Granicus"},
		{title: 'Siege of Halicarnassus', location: {lat: 37.032088, lng: 27.430485}, wiki: "Siege_of_Halicarnassus"},
		{title: 'Battle of Issus', location: {lat: 36.8474414, lng: 36.2003325}, wiki: "Battle_of_Issus"},
		{title: 'Siege of Tyre', location: {lat: 33.269792, lng: 35.193262}, wiki: "Siege_of_Tyre_(332_BC)"},
		{title: 'Siege of Gaza', location: {lat: 31.504591, lng: 34.46334}, wiki: "Siege_of_Gaza"},
		{title: 'Battle of Gaugamela', location: {lat: 36.854746, lng: 42.972445}, wiki: "Battle_of_Gaugamela"},
		{title: 'Battle of the Persian Gate', location: {lat: 30.6877486, lng: 51.6165331}, wiki: "Battle_of_the_Persian_Gate"}
	]);
	self.markers = ko.observableArray([]);
	self.wikiData = ko.observableArray([]);
};

var model = new Model();

// These are the locations that will be shown to the user.
var ViewModel = function() {

	var self = this;

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

	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 46.5933366, lng: -112.0857337},
		zoom: 11,
		styles: styles,
		mapTypeControl: false
	});

	//Create variable to contain the infowindow for each marker
	var warInfowindow = new google.maps.InfoWindow();

	// Style the markers a bit. This will be our listing marker icon.
	var defaultIcon = makeMarkerIcon('markers/museum_war.png');

	// Create a "highlighted location" marker color for when the user
	// mouses over the marker.
	var highlightedIcon = makeMarkerIcon('markers/museum_war_highlighted.png');

	for (var i = 0; i < model.places().length; i++) {
		// Get the position from the location array.
		var lat = model.places()[i].location;
		var title = model.places()[i].title;
		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: lat,
			title: title,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});

		model.markers().push(marker);

		// Create an onclick event to open the large infowindow at each marker.
		marker.addListener('click', function() {
			populateInfoWindow(this, warInfowindow);
			toggleDrop(this);
		});

		// Add bounce effect to currently clicked icon
		function toggleDrop(marker) {
				if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.DROP);
				}
		}

		// Two event listeners - one for mouseover, one for mouseout,
		// to change the colors back and forth.
		marker.addListener('mouseover', function() {
			this.setIcon(highlightedIcon);
		});
		marker.addListener('mouseout', function() {
			this.setIcon(defaultIcon);
		});

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
			infowindow.open(self.map, marker);
	}

	// This function will loop through the markers array and display them all.
	function showMarkers() {
		var bounds = new google.maps.LatLngBounds();
		// Extend the boundaries of the map for each marker and display the marker
		for (var i = 0; i < model.markers().length; i++) {
			model.markers()[i].setMap(self.map);
			bounds.extend(model.markers()[i].position);
		}
		self.map.fitBounds(bounds);
	}

	// This function takes in a COLOR, and then creates a new marker
	// icon of that color. The icon will be 21 px wide by 34 high, have an origin
	// of 0, 0 and be anchored at 10, 34).
	function makeMarkerIcon(markerColor) {
		var markerImage = new google.maps.MarkerImage(
			markerColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0, 0),
			new google.maps.Point(10, 34),
			new google.maps.Size(21,34));
		return markerImage;
	}

	showMarkers();
	wikiStore();

	// This function will loop through the listings and hide them all.
	function hideMarkers(markers) {
		for (var i = 0; i < model.markers().length; i++) {
			markers[i].setMap(null);
		}
	}

	ko.applyBindings(model);

};

function wikiStore() {
	model.places().forEach(function(bars, index){
		var wiki = model.places()[index].wiki;
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + wiki + "",
			data: "query",
			dataType: 'jsonp',
			type: 'GET',
			headers: { 'Api-User-Agent': 'Example/1.0' },
			success: function(data) {
				console.log(JSON.stringify(data, null, '  '));
				var rawWiki = JSON.stringify(data.query.pages);
				model.wikiData().push(rawWiki);
			}
		});
	});
}

// Show the correct infowindow for each marker when the list item is clicked.
function showInfoWindow() {
	// ViewModel().hideMarkers();
	var marker = model.markers()[this.id];
	console.log(marker.title + marker.position);
	var wiki = model.wikiData()[this.id];
	document.getElementById('clicked-content').innerHTML = JSON.stringify(wiki);



}

function initMap() {
    var view = new ViewModel();
    ko.applyBindings(view);
}
