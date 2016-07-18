var map;
//stores the information within the model to be displayed on the map
var Model = function() {
	var self = this;
	self.places = ko.observableArray([
		{title: 'Sweetgrass Bakery', location: {lat: 46.589938, lng: -112.038616}},
		{title: 'Park Avenue Bakery', location: {lat: 46.586355,lng: -112.040753}},
		{title: 'Cafe Zydeco', location: {lat: 46.5961329,lng: -112.034301}},
		{title: 'Suds Hut', location: {lat: 46.6128834,lng: -112.0211412}},
		{title: 'Jade Garden', location: {lat: 46.6170219,lng: -112.0211496}},
		{title: 'MacKenzie River Pizza Co.', location: {lat: 46.6181675,lng: -112.0211826}}
	]);
	self.markers = ko.observableArray([]);
};

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
		zoom: 10,
		styles: styles,
		mapTypeControl: false
	});

	// Style the markers a bit. This will be our listing marker icon.
	var defaultIcon = makeMarkerIcon('0091ff');

	var model = new Model();
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
	}
	console.log(model.markers());

	// This function will loop through the markers array and display them all.
	function showMarkers() {
		var bounds = new google.maps.LatLngBounds();
		// Extend the boundaries of the map for each marker and display the marker
		for (var i = 0; i < model.markers().length; i++) {
			model.markers()[i].setMap(map);
			bounds.extend(model.markers()[i].position);
		}
		// map.fitBounds(bounds);
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

	showMarkers();
	ko.applyBindings(model);

};

function initMap() {

    var vm = new ViewModel();
    ko.applyBindings(vm);
}
