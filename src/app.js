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

// Displays the city and the weather
function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;

    let temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}°C`;
}

function searchForCity(city) {
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector(".search-input").value;
    searchForCity(city);
}

function userLocation(position) {
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

function currentLocationInfo(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(userLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", currentLocationInfo);

searchForCity("Los Angeles");
