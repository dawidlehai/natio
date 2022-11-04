import { getData } from "./helpers.js";

export const state = {
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

export const loadCountryAndNeighbours = async function (country) {
  try {
    await loadCountry(country);

    if (!state.country.borders.length) return;
    await loadNeighbours(...state.country.borders);
  } catch (error) {
    throw error;
  }
};
