import { API_URL, URL_COUNTRY, URL_NEIGHBOURS } from "./config.js";

export const getData = async function (...countries) {
  try {
    let url;
    countries?.length > 1 ? (url = URL_NEIGHBOURS) : (url = URL_COUNTRY);

    const response = await fetch(`${API_URL}${url}${countries.join()}`);
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
