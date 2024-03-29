function displayTemperature(response) {
  console.log(response.data);
  let currentTemperatureDisplay = document.querySelector("#today-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let descriptionDisplay = response.data.condition.description;
  let humidity = document.querySelector(".humidity");
  let humidityDisplay = response.data.temperature.humidity;
  let wind = document.querySelector(".wind");
  let windDisplay = response.data.temperature.humidity;
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconDisplay = document.querySelector("#icon");

  iconDisplay.innerHTML = `<img src="${response.data.condition.icon_url}" class="material-symbols-outlined">`;

  h1.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);

  currentTemperatureDisplay.innerHTML = temperature;
  description.innerHTML = descriptionDisplay;
  humidity.innerHTML = `${humidityDisplay}%`;
  wind.innerHTML = `${windDisplay}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city-input");
  let displayCity = cityName.value;
  let apiKey = "07944d6694a03tbbadbf6e7o423a9f8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${displayCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "07944d6694a03tbbadbf6e7o423a9f8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-container">
     <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon">
            </div>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${Math.round(
                  day.temperature.maximum
                )}&deg;</strong></span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}&deg;</span>
            </div>
            </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let enterCity = document.querySelector(".search-city");
enterCity.addEventListener("submit", search);
