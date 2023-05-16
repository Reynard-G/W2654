function createFeature(row) {
    let latitude, longitude;
    if (row[3] === '' || row[4] === '') {
        console.log(`Station ${row[1]} has no valid coordinates.`);
        return;
    } else {
        latitude = parseFloat(row[3]);
        longitude = parseFloat(row[4]);
    }

    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
        },
        properties: {
            station_id: row[1],
            observation_time: row[2],
            temp_c: parseFloat(row[5]),
            dewpoint_c: parseFloat(row[6]),
            wind_dir_degrees: parseFloat(row[7]),
            wind_speed_kt: parseFloat(row[8]),
            wind_gust_kt: parseFloat(row[9]),
            visibility_statute_mi: parseFloat(row[10]),
            altim_in_hg: parseFloat(row[11]),
            sea_level_pressure_mb: parseFloat(row[12]),
            corrected: row[13],
            auto: row[14],
            auto_station: row[15],
            maintenance_indicator_on: row[16],
            no_signal: row[17],
            lightning_sensor_off: row[18],
            freezing_rain_sensor_off: row[19],
            present_weather_sensor_off: row[20],
            wx_string: row[21],
            sky_cover_1: row[22],
            cloud_base_ft_agl_1: parseFloat(row[23]),
            sky_cover_2: row[24],
            cloud_base_ft_agl_2: parseFloat(row[25]),
            sky_cover_3: row[26],
            cloud_base_ft_agl_3: parseFloat(row[27]),
            sky_cover_4: row[28],
            cloud_base_ft_agl_4: parseFloat(row[29]),
            flight_category: row[30],
            three_hr_pressure_tendency_mb: parseFloat(row[31]),
            maxT_c: parseFloat(row[32]),
            minT_c: parseFloat(row[33]),
            maxT24hr_c: parseFloat(row[34]),
            minT24hr_c: parseFloat(row[35]),
            precip_in: parseFloat(row[36]),
            pcp3hr_in: parseFloat(row[37]),
            pcp6hr_in: parseFloat(row[38]),
            pcp24hr_in: parseFloat(row[39]),
            snow_in: parseFloat(row[40]),
            vert_vis_ft: parseFloat(row[41]),
            metar_type: row[42],
            elevation_m: parseFloat(row[43])
        }
    };
}

async function csvToGeoJSON(csvFileUrl) {
    const response = await fetch(csvFileUrl);
    const csvData = await response.text();

    const markers = csvData.split('\n').map(row => row.split(','));

    // Remove the first 6 rows (header information) & last row (empty)
    markers.splice(0, 6);
    markers.splice(-1, 1);

    const features = markers.map(row => createFeature(row));

    return {
        type: 'FeatureCollection',
        features: features
    };
}

function plotMarkersFromCSV(geoJSON) {
    // Fetch the CSV file
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(csvData => {
            // Parse the CSV data
            const markers = csvData.split('\n').map(row => row.split(','));

            // Remove the first 6 rows (header information) & last row (empty)
            markers.splice(0, 6);
            markers.splice(-1, 1);

            // Iterate through the markers and plot them on the map
            markers.forEach(marker => {
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

(async () => {
    const geoJSON = await csvToGeoJSON(csvFileUrl);
    console.log(geoJSON);
})();
//plotMarkersFromCSV(geoJSON);