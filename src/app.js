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

    let windSpeed = Math.round(response.data.wind.speed);
    document.querySelector(
        ".wind-speed"
    ).innerHTML = `Wind Speed: ${windSpeed} km/h`;

    document.querySelector(".weather-description").innerHTML =
        response.data.weather[0].description;

    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].description);

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

let searchBtn = document.querySelector(".search-icon");
searchBtn.addEventListener("click", handleSubmit);

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

// Displays the forecast for the next 5 days
function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = '<div class="row">';
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
        forecastHTML =
            forecastHTML +
            `
        <div class="col-2">
            <div class="forecast-date">${day}</div>
            <img
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                width="42px"
            />
            <div class="forecast-temp">
                <span class="forecast-max-temp">18°</span>
                <span class="forecast-min-temp">12°</span>
            </div>
        </div>
    `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

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

searchForCity("Los Angeles");
displayForecast();
