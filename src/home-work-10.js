// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchCountries } from './fetchCountries';
// var debounce = require('lodash.debounce');

// const DEBOUNCE_DELAY = 300;
// const inputEl = document.querySelector('[id="search-box"]');
// const listOfCountryData = document.querySelector('.country-info');
// const listOfCountryName = document.querySelector('.country-list');

// listOfCountryName.style.paddingLeft = 0;
// listOfCountryName.style.margin = 0;
// listOfCountryData.style.margin = 0;
// inputEl.style.margin = 0;

// inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

// function onCountrySearch(event) {
//   const searchCountryName = event.target.value.trim();

//   if (!searchCountryName) {
//     listOfCountryName.innerHTML = '';
//     listOfCountryData.innerHTML = '';
//     return;
//   }
//   console.log(searchCountryName);
//   console.dir(listOfCountryName.childNodes.length);

//   fetchCountries(searchCountryName)
//     .then(countries => {
//       createListCountryMarkup(countries);
//     })
//     .catch(error => {
//       onFetchError(error);
//     });
// }

// function createOneCountryMarkup(countries) {
//   listOfCountryName.innerHTML = '';
//   const markupNameOfCountry = countries
//     .map(country => {
//       return `<div style = "display: flex; align-items: center"><img src = ${
//         country.flags.svg
//       } style = "width: 40px; max-height: 30px; margin-right: 10px"><h1>${
//         country.name.common
//       }</h1></div>
//       <p><b>Capital:</b> ${country.capital}</p>
//       <p><b>Population:</b> ${country.population}</p>
//       <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
//     })
//     .join('');
//   listOfCountryData.innerHTML = markupNameOfCountry;
//   onFetchErrorLength(countries);
// }

// function createListCountryMarkup(countries) {
//   listOfCountryData.innerHTML = '';
//   const markupNameOfCountry = countries
//     .map(country => {
//       return `<li style = "display: flex; align-items: center"><img src = ${country.flags.svg} style = "width: 40px; max-height: 30px; margin-right: 10px"><p>${country.name.common}</p></li>`;
//     })
//     .join('');
//   listOfCountryName.innerHTML = markupNameOfCountry;
//   onFetchErrorLength(countries);
// }

// function onFetchErrorLength(countries) {
//   const lengthOfListCountry = listOfCountryName.childNodes.length;
//   if (lengthOfListCountry > 10) {
//     listOfCountryName.innerHTML = '';
//     Notify.warning(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   } else if (lengthOfListCountry > 2 && lengthOfListCountry < 10) {
//     createListCountryMarkup(countries);
//   } else if (lengthOfListCountry === 1) {
//     createOneCountryMarkup(countries);
//   } else if (lengthOfListCountry === 0) {
//     onFetchError();
//   }
// }

// function onFetchError(error) {
//   Notify.failure('Oops, there is no country with that name');
// }

// export function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
