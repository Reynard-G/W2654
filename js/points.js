function plotMarkersFromCSV(csvFileUrl) {
    const flightCategoryColors = {
        "VFR": "#01B636",
        "MVFR": "#2069E0",
        "IFR": "#F44336",
        "LIFR": "#800080"
    };

    // Fetch the CSV file
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvData => {
            // Parse the CSV data
            const markers = csvData.split('\n').map(row => row.split(','));

            // Remove the first 6 rows (header information) & last row (empty)
            markers.splice(0, 6);
            markers.splice(-1, 1);

            // Limit the amount of markers
            const limitedMarkers = markers.slice(0, 100);

            // Iterate through the markers and plot them on the map
            limitedMarkers.forEach(marker => {
                // Check if station has a valid latitude and longitude
                if (marker[3] === '' || marker[4] === '') {
                    console.log(`Station ${marker[1]} has no valid coordinates.`);
                    return;
                }

                const latitude = parseFloat(marker[3]);
                const longitude = parseFloat(marker[4]);

                // Create a popup
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<div>
                            <h3>Station ID: ${marker[1]}</h3>
                            <strong>Temperature:</strong> ${marker[5] ? `${marker[5]}°C` : 'None Provided'}<br>
                            <strong>Visibility:</strong> ${marker[10] ? `${marker[10]} statute miles` : 'None Provided'}<br>
                            <strong>Dew Point:</strong> ${marker[6] ? `${marker[6]}°C` : 'None Provided'}<br>
                            <strong>Weather:</strong> ${marker[21] ? `${marker[21]}` : 'None Provided'}<br>
                            <strong>Altimeter:</strong> ${marker[11] ? `${marker[11]} inHg` : 'None Provided'}<br>
                            <strong>Ceiling:</strong> ${marker[22] ? `${marker[22]}` : 'None Provided'}<br>
                            <strong>Wind Speed:</strong> ${marker[8] ? `${marker[8]} knots` : 'None Provided'}<br>
                            <strong>Wind Gust:</strong> ${marker[9] ? `${marker[9]} knots` : 'None Provided'}<br>
                            <strong>Wind Direction:</strong> ${marker[7] ? `${marker[7]}°` : 'None Provided'}<br>
                            <strong>Cloud Cover:</strong> ${marker[23] ? `${marker[23]}` : 'None Provided'}<br>
                            <strong>Flight Category:</strong> ${marker[30] ? `${marker[30]}` : 'None Provided'}
                        </div>`);

                // Create a marker
                new mapboxgl.Marker({ color: flightCategoryColors[marker[30]] })
                    .setLngLat([longitude, latitude])
                    .setPopup(popup)
                    .setRotation(marker[7] ? parseInt(marker[7]) : 0)
                    .addTo(map);
            });
        });

}

const csvFileUrl = 'data/Example-metars.csv';
plotMarkersFromCSV(csvFileUrl);