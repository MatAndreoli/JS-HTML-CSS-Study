const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = 'e2403ff7cc4d4b98b8c163918231803';
  const city = document.querySelector('.search-box input').value;
  if (city == '') return;

  fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    .then((res) => res.json())
    .then((json) => {
      if (json.error && json.error.code === 1006) {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      const condition = json.current.condition.text.toLowerCase();

      if (condition.includes('clear') || condition.includes('sun')) {
        image.src = 'imgs/clear.png';
      } else if (condition.includes('rain')) {
        image.src = 'imgs/rain.png';
      } else if (condition.includes('snow')) {
        image.src = 'imgs/snow.png';
      } else if (condition.includes('cloud')) {
        image.src = 'imgs/cloud.png';
      } else if (condition.includes('haze')) {
        image.src = 'imgs/mist.png';
      } else {
        image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
      description.innerHTML = `${json.current.condition.text}`;
      humidity.innerHTML = `${json.current.humidity}`;
      wind.innerHTML = `${json.current.wind_kph}`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
});
