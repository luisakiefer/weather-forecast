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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchInput.value;

  let apiKey = "dfb7d1f03e3eb9184605492c12826c7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  function displayTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${temp}°C`;
  }

  axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", search);

let tempElement = document.querySelector("#temperature");
