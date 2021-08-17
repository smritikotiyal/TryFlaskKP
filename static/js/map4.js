$(document).ready(function () {
	'use strict';

	if ($('#map-leaflet').length) {
		var map = L.map('map-leaflet', {
			zoom: 12,
			maxZoom: 20,
			tap: false,
			gestureHandling: true,
			// center: [40.90, -73.90]
			center: [53.79236534575617, -1.7549116707150403]
		});

		var marker_cluster = L.markerClusterGroup();

		map.scrollWheelZoom.disable();

		var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
			scrollWheelZoom: false,
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		$.ajax('../static/js/markers.json', {
			success: function (markers) {
				$.each(markers, function (index, value) {
					var icon = L.divIcon({
						html: value.icon,
						iconSize: [50, 50],
						iconAnchor: [50, 50],
						popupAnchor: [-20, -42]
					});

					var marker = L.marker(value.center, {
						icon: icon
					}).addTo(map);

					marker.bindPopup(
						'<div class="listing-window-image-wrapper" id="data" onclick=populateForm()>' +
						'<a href="/#p5">' +
						'<div class="listing-window-image" style="background-image: url(' + value.image + ');"></div>' +
						'<div class="listing-window-content">' +
						'<div class="info" id="info" value="">' +
						'<h2 id="title" >' + value.title + '</h2>' +
						'<h3 id="id">' + value.id + '</h3>' +
						'<p>' + value.desc + '</p>' +
						'</div>' +
						'</div>' +
						'</a>' +
						'</div>'
					);

					marker_cluster.addLayer(marker);
				});

				map.addLayer(marker_cluster);
			}
		});
	}

});
