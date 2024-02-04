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

  h1.innerHTML = response.data.city;
  time.innerHTML = date.getHours();
  currentTemperatureDisplay.innerHTML = temperature;
  description.innerHTML = descriptionDisplay;
  humidity.innerHTML = `${humidityDisplay}%`;
  wind.innerHTML = `${windDisplay}km/h`;
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city-input");
  let displayCity = cityName.value;
  let apiKey = "07944d6694a03tbbadbf6e7o423a9f8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${displayCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let enterCity = document.querySelector(".search-city");
enterCity.addEventListener("submit", search);
