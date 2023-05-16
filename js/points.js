function plotMarkersFromCSV(csvFileUrl) {
    // Fetch the CSV file
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvData => {
            // Parse the CSV data
            const markers = csvData.split('\n').map(row => row.split(','));

            // Remove the first 6 rows (header information) & last row (empty)
            markers.splice(0, 6);
            markers.splice(-1, 1);

            // Limit the markers to 500
            const limitedMarkers = markers.slice(0, 500);

            // Iterate through the markers and plot them on the map
            limitedMarkers.forEach(marker => {
                // Check if station has a valid latitude and longitude
                if (marker[3] === '' || marker[4] === '') {
                    console.log(`Station ${marker[1]} has no valid coordinates.`);
                    return;
                }

                const latitude = parseFloat(marker[3]);
                const longitude = parseFloat(marker[4]);

                // Create a marker
                new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });
        });

}

const csvFileUrl = 'data/Example-metars.csv';
plotMarkersFromCSV(csvFileUrl);