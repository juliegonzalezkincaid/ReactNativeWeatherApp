export const getGridPoint = async (location) => {
    try {
        const url = `https://api.weather.gov/points/${location.coords.latitude},${location.coords.longitude}`;
        const response = await fetch(url);
        const result = await response.json();
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
    console.log('getForecast', forecastUrl);
    try {
        const url = forecastUrl;
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