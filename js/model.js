import { getData } from "./helpers.js";

const state = {
  country: {},
  neighbours: [],
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
    state.neighbours = await getData(...neighbours);
  } catch (error) {
    throw error;
  }
};

const loadCountryAndNeighbours = async function (country) {
  try {
    await loadCountry(country);
    await loadNeighbours(...state.country.borders);
  } catch (error) {
    throw error;
  }
};

loadCountryAndNeighbours("poland");
