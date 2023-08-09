export const getGridPoint = async (location) => {
    //Fetches the grid point (forecast data) based on a given location.
    //location: An object which contains coords property, which itself has latitude and longitude properties.
    try {
        const url = `https://api.weather.gov/points/${location.coords.latitude},${location.coords.longitude}`;
        const response = await fetch(url);
        //send an HTTP GET request to the constructed URL.
        const result = await response.json();
        //Converts the response to a JSON object.
        if (response.ok) {
            console.log('getGridPoint success');
            return result.properties.forecast;
        } else {
            console.error(`getGridPoint error: ${JSON.stringify(result)}`);
        }
    } catch (error) {
        console.error(`getGridPoint error: ${error.message}`);
    }
}

export const getForecastData = async (forecastUrl) => {
    //Fetches the detailed forecast data from a given forecast URL.
    //forecastUrl: A URL string pointing to the forecast data
    console.log('getForecast', forecastUrl);
    try {
        const url = forecastUrl;
        //Logs the URL being accessed.
        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
            console.log('getGridPoint success');
            return result.properties.periods
        } else {
            console.error(`getGridPoint error: ${JSON.stringify(result)}`);
        }
        
    } catch (error) {
        console.error(`getGridPoint error: ${error.message}`);
    }
}