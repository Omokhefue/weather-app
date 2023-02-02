const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const updateUI = (data) => {
  const { cityDets, weather } = data;
  details.innerHTML = `
<h5 class="my-3">${cityDets.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="my-1">${weather.LocalObservationDateTime
.slice(11,16)}</div>
<div class="display-4 my-4">
  <span>${weather.Temperature.Metric.Value}</span>
  <span>&deg;C</span>
</div>
`;
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  if (weather.IsDayTime == false) {
    body.style.backgroundColor = "rgb(2, 2, 20)";
    h1.classList.remove("text-muted");
    cityForm.classList.remove("text-muted");
    h1.style.color='#fff'
    cityForm.style.color='#fff'
  } else {
    body.style.backgroundColor = "#eeedec";
    h1.classList.add("text-muted");
    cityForm.classList.add("text-muted");
  }
  time.setAttribute("src", timeSrc);
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  scrollTo(999999999999999, 999999999999);
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => {updateUI(data)
  
    })
    .catch((err) => console.log(err));
}
