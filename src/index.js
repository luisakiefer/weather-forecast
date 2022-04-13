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
  let city = document.querySelector("h1");
  city.innerHTLM = response.data.name;

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)} °C`;

  let rain = document.querySelector("#precipitation");
  rain.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.main.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  console.log(response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "dfb7d1f03e3eb9184605492c12826c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", submitSearch);

let tempElement = document.querySelector("#temperature");
