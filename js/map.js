mapboxgl.accessToken = "KEY HERE";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-98.35, 39.50], // Center of the United States
    zoom: 2.5,
    maxZoom: 10,
    minZoom: 1.5,
    attributionControl: false,
});

map.on('load', () => {
    map.addSource('stations', {
        type: 'geojson',
        data: "data/Example-metars.geojson",
        cluster: true,
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'stations',
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });
});