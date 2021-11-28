function selectCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = `${input.value}`;
  let apiKey = "9d2606ef8c586cbebc46ab5a29408811";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", selectCity);

function formatDate(timestamp) {
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
  return `${day} ${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector("#current-temperature");
  let description = document.querySelector("#descr");
  let humidity = document.querySelector("#humidity");
  let dateElement = document.querySelector("#current-time");
  cityElement.innerHTML = cityName;
  tempElement.innerHTML = `${currentTemp}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
