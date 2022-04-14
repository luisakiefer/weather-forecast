function currentDate() {
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
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  let currentDate = `${currentDay}, ${currentHour}:${currentMinutes}`;
  return currentDate;
}

let date = document.querySelector("#date");
date.innerHTML = currentDate();

function displayWeather(response) {
  let city = document.querySelector("#city-name");
  city.innerHTLM = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)} °C`;

  let rain = document.querySelector("#humidity");
  rain.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} m/s`;
  console.log(wind);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "dfb7d1f03e3eb9184605492c12826c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let tempElement = document.querySelector("#temperature");
