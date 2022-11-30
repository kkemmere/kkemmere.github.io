// Practice using Async function setTimeout(callback, delay)
// console.log("hi");

// setTimeout(() => {
//   console.log("Async result");
// }, 5000);

// console.log("This is synchronous");

// Information for this API can be found here: https://openweathermap.org/current

let httpRequest = new XMLHttpRequest();
const apiKey = config.SECRET_API_KEY;
const API_URL = config.MY_API_TOKEN + apiKey;

// Ajax request to get data. If status request is 200 OK send data to our DOM else call badData function
export const getData = (API_URL, dataArticle, badData) => {
  httpRequest.open("GET", API_URL);
  httpRequest.onload = () => {
    {
      httpRequest.status === 200
        ? dataArticle(httpRequest.responseText)
        : badData(httpRequest.status);
    }
  };
  httpRequest.send();
};

const badData = (status) => {
  console.log("API call failed with status code:", status);
};
const tempToF = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 + 32);
};

const dataArticle = (data) => {
  const dataObj = JSON.parse(data);

  const weatherArticle = document.createElement("article");
  weatherArticle.classList.add("weather");

  weatherArticle.innerHTML = `
    <h2>${dataObj.name}</h2>
    <img src="http://openweathermap.org/img/w/${
      dataObj.weather[0].icon
    }.png" alt="${dataObj.weather[0].description}" width="50" height="50"/>
    <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${
    dataObj.weather[0].description
  }
    `;

  const main = document.querySelector("main");

  main.append(weatherArticle);
};

getData(API_URL, dataArticle, badData);
