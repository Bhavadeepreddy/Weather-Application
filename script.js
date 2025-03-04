// ADD EVENTLISTNER TO GET THE USER LOCATION
document.getElementById("location-input").addEventListener("change", async () => {
    // USER ENTERED LOCATION
    const location = document.getElementById('location-input').value;

    // FETCH THE WEATHER DATA
    const weatherData = await getWeatherData(location);

    // DISPLAY THE WEATHER DATA ON THE UI
    displayWeatherData(weatherData)
});

const getWeatherData = async (location) => {
    if(!location) {
        return {};
    }

    const apiKey = `YOUR API KEY HERE`
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    const data = await response.json()
    return data;
}

function getBackgroundColor(temperature) {
    if(temperature < 0) {
        return 'lightBlue'
    } else if(temperature < 10) {
        return 'lightgreen'
    } else if(temperature < 20) {
        return 'lightyellow'
    } else if(temperature < 30) {
        return 'lightsalmon'
    } else if(temperature > 30) {
        return 'lightcoral'
    } else {
        return 'red'
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if (!weatherDataElement) {
        console.error("Element with ID 'weather-data' not found.");
        return;
    }

    if(Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please Enter A Location To Check The Weather";
    } else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.15)}°C</p>
            <p>Humidity: ${data.main.humidity}</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData()
    displayWeatherData(weatherData)
}