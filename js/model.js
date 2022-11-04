import { getData } from "./helpers.js";

export const state = {
  country: {},
  neighbours: [],
  progress: new Set(),
  favourites: [],
};

const createSnippet = function (name, flag) {
  return {
    name,
    flag,
  };
};

const saveProgress = function () {
  state.progress.add(
    createSnippet(state.country.name.common, state.country.flags.png)
  );
  state.neighbours.forEach((country) =>
    state.progress.add(createSnippet(country.name.common, country.flags.png))
  );
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
    if (state.country.borders) await loadNeighbours(...state.country.borders);

    saveProgress();
    console.log(state.country);
    console.log(state.neighbours);
    console.log(state.progress);
  } catch (error) {
    throw error;
  }
};
