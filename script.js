const apiKey ='c19e3bc6e3d8e6b7238a5e56c377fab4' 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    if (data.cod === '404') {
        weatherInfo.innerHTML = '<p>City not found</p>';
        weatherInfo.style.display = 'block';
        return;
    }

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    weatherInfo.style.display = 'block';
}
