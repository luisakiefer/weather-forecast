function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" width="36"/>
                <div class="weather-forecast-temp"> 
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
              </div>
            </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dfb7d1f03e3eb9184605492c12826c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let rain = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-speed");
  let date = document.querySelector("#date");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(celsiusTemp)} °C`;
  rain.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;
  date.innerHTML = currentDate(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "dfb7d1f03e3eb9184605492c12826c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = `${Math.round(fahrenheitTemp)} °F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(celsiusTemp)} °C`;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Porto Alegre");
