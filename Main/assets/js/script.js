//---https://api.openweathermap.org/data/2.5/weather?q=Charlotte&appid=371dead36e8c5b8aa978441fa4daca9a&units=imperial
var searchCityEl = document.querySelector('#searchCity');
var cityResultEl = document.querySelector('#city-result')
var cityContentEl = document.querySelector('#city-content');

var geocodeLocationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityName + '&limit=1&appid=' + apiKey;
var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityName + '&limit=1&appid=' + apiKey;
var apiKey = '0cf9fa6352cc1e6990abaf90639d4a15'

var formSubmitHandler = function(event) {
    event.preventDefault();
    var City = citySearchEl.value.trim();
    if (City) {
        getWeather(City);
        cityResultEl.textContent = '';
        cityContentEl.textContent = '';
    } else {
        alert('Enter a city!');
    }
};

var buttonHandler = function (event) {
    
}

function coordinates(cityName) {
    var geocodeLocationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    fetch(geocodeLocationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getWeather(data[0].lat, data[0].lon);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function getWeather(lat, lon) {
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    fetch(fiveDayApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayFiveDay(data);
        })
        .catch(function (err) {
            console.log(err);
        });
    fetch(currentApiUrl)
        .then(function(response) {
            return response.json();
            console.log('cityName:', response)
        })    
        .then(function(data) {
            displayCurrent(data);
        })
        .catch(function(err) {
            console.log(err);
        });
};


searchCityEl.addEventListener('submit', formSubmitHandler);
