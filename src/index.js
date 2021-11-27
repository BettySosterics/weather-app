let now = new Date();

let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day}  ${hours}:${minutes}`;

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
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day} ${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = `${currentTemp}°C`;
  let description = document.querySelector("#descr");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
