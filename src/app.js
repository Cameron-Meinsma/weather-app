// Displays the current day and time
let now = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

let actualDay = days[now.getDay()];
let actualHours = now.getHours();
let actualMinutes = now.getMinutes();
if (actualMinutes < 10) {
    actualMinutes = `0${actualMinutes}`;
}

let dayAndTime = document.querySelector(".date-time");
dayAndTime.innerHTML = `${actualDay} ${actualHours}:${actualMinutes}`;

// Displays the city name that the user searched for
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", function (event) {
    event.preventDefault();
    let searchedCity = document.querySelector(".search-input").value;
    let city = document.querySelector("#city");
    city.innerText = searchedCity;

    // Displays the weather of the city that the user searched for
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&&units=metric`;

    function tempSearchedCity(response) {
        let temp = Math.round(response.data.main.temp);
        let showTemp = document.querySelector("#temperature");
        showTemp.innerHTML = `${temp}°C`;
    }

    axios.get(apiUrl).then(tempSearchedCity);
});

// Current location
function userLocWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}°C`;

    let userCity = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = `${userCity}`;
}

function userLocation(position) {
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(userLocWeather);
}

function currentLocationInfo(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(userLocation);
}

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", currentLocationInfo);
