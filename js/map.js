mapboxgl.accessToken = "KEY HERE";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-98.35, 39.50], // Center of the United States
    zoom: 2.5,
    maxZoom: 10,
    minZoom: 1.5,
    includeGeometry: true,
    attributionControl: false,
});
