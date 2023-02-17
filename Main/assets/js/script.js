//---https://api.openweathermap.org/data/2.5/weather?q=Charlotte&appid=371dead36e8c5b8aa978441fa4daca9a&units=imperial
var cityContentEl = document.querySelector('#city-content');
var searchCity = document.querySelector('#searchCity');


var searchApi = function () {
    var city = $('#city').val();
    localStorage.setItem("city", city);
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=0cf9fa6352cc1e6990abaf90639d4a15'
    fetch (apiUrl)
        .then(function (response) {
            if (response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (LocRes) {
            return resultTextEl.textContent = LocRes.search.query;
            console.log(LocRes);
            if(!LocRes.results.length) {
                console.log('No city found');
                resultContentEl.innerHTML = '<h3>No city found, try another search.</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i=0; i < LocRes.results.length; i++) {
                    printResults(LocRes.results[i]);
                }
            }
        })
        .catch(function(error) {
            console.error(error);
        });
}

function handleSearch(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#searchCity').value;

    if (!searchInputVal) {
        console.error('Input a city.');
        return;
    }
    searchApi(searchInputVal);
}

searchCity.addEventListener('submit', handleSearch);

getParams();
