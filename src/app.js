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

    tempInCelsius = response.data.main.temp;

    let temp = Math.round(tempInCelsius);
    let showTemp = document.querySelector("#temperature");
    showTemp.innerHTML = `${temp}`;

    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
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

// Converts from celsius to fahrenheit
// (0 × 9/5) + 32
function cToF(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    celsiusBtn.classList.remove("active");
    fahrenheitBtn.classList.add("active");
    tempElement.innerHTML = Math.round((tempInCelsius * 9) / 5 + 32);
}

// Converts from fahrenheit to celsius
// (32 − 32) × 5/9
function fToC(event) {
    event.preventDefault();
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(tempInCelsius);
}

let tempInCelsius = null;

let fahrenheitBtn = document.querySelector(".fahrenheit");
fahrenheitBtn.addEventListener("click", cToF);

let celsiusBtn = document.querySelector(".celsius");
celsiusBtn.addEventListener("click", fToC);
