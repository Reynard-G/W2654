// On mousemove over the map, show the latlng coordinates of the mouse pointer
map.on('mousemove', function (e) {
    document.getElementById('coordinates').innerHTML = `Latitude: ${e.lngLat.lat.toFixed(2)}° | Longitude: ${e.lngLat.lng.toFixed(2)}°`;
});

// 
map.on('mouseout', function () {
    document.getElementById('coordinates').innerHTML = 'Latitude: ---° | Longitude: ---°';
});