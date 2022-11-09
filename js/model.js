import { getData, randomInt, cleanString } from "./helpers.js";

import allCountries from "./allCountries.js";
import allTimezones from "./allTimeZones.js";
import allTimeZones from "./allTimeZones.js";

export const state = {
  country: {},
  neighbours: [],
  history: {},
  progress: 0,
  favourites: {},
};

const persistState = function () {
  localStorage.setItem("state", JSON.stringify(state));
};

const saveProgress = function () {
  state.history[state.country.name.common] = state.country.flags.png;
  state.neighbours.forEach(
    (country) => (state.history[country.name.common] = country.flags.png)
  );
  state.progress = Object.keys(state.history).length;
};

export const toggleFavourites = function (name, flag = null) {
  if (state.favourites.hasOwnProperty(name) || flag === null)
    delete state.favourites[name];
  else state.favourites[name] = flag;

  persistState();
};

const loadCountry = async function (country) {
  try {
    [state.country] = await getData(country);
  } catch (error) {
    throw error;
  }
};

const loadNeighbours = async function (...neighbours) {
  try {
    state.neighbours = await getData(neighbours, true);
  } catch (error) {
    throw error;
  }
};

export const loadCountryAndNeighbours = async function (country) {
  try {
    await loadCountry(country);
    if (state.country.borders) await loadNeighbours(...state.country.borders);
    else state.neighbours = [];

    saveProgress();
    persistState();
  } catch (error) {
    throw error;
  }
};

export const generateRandomCountry = function () {
  const randomNumber = randomInt(0, allCountries.length - 1);
  return allCountries[randomNumber];
};

export const generateSuggestions = function (query) {
  const cleanQuery = cleanString(query);
  const suggestions = new Set();

  allCountries.forEach((country) => {
    const cleanCountry = cleanString(country);
    if (cleanCountry.startsWith(cleanQuery)) suggestions.add(country);
  });

  allCountries.forEach((country) => {
    const cleanCountry = cleanString(country);
    if (cleanCountry.includes(cleanQuery)) suggestions.add(country);
  });

  return suggestions;
};

export const getUsersCountry = function () {
  if (!Intl) return false;
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzArr = userTimeZone.split("/");
  const userCity = tzArr[tzArr.length - 1];
  const userCountry = allTimeZones[userCity];
  return userCountry;
};

const init = function () {
  // localStorage.clear();
  const storage = JSON.parse(localStorage.getItem("state"));

  if (!storage) return;

  state.country = storage.country;
  state.neighbours = storage.neighbours;
  state.favourites = storage.favourites;
  state.history = storage.history;
  state.progress = storage.progress;
};

init();
