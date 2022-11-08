import { API_URL, URL_COUNTRY, URL_NEIGHBOURS } from "./config.js";

export const getData = async function (countries, codes = false) {
  try {
    let url;
    codes ? (url = URL_NEIGHBOURS) : (url = URL_COUNTRY);

    const response = await fetch(`${API_URL}${url}${countries}`);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmptyObject = function (object) {
  return Object.keys(object).length === 0;
};

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

export const updateUrl = (url) =>
  window.history.pushState("", "", `?query=${url}`);
