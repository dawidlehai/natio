import { API_URL } from "./config.js";

const state = {
  country: {},
};

const getData = async function (country) {
  try {
    return await (await fetch(`${API_URL}${country}`)).json();
  } catch (error) {
    throw error;
  }
};
