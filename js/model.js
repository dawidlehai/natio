import { getData } from "./helpers.js";

export const state = {
  country: {},
  neighbours: [],
  history: new Set(),
  progress: 0,
  favourites: new Set(),
};

const createSnippet = function (
  name = state.country.name.common,
  flag = state.country.flags.png
) {
  return {
    name,
    flag,
  };
};

const saveProgress = function () {
  state.history.add(createSnippet());
  state.neighbours.forEach((country) =>
    state.history.add(createSnippet(country.name.common, country.flags.png))
  );
  state.progress = state.history.size;
};

export const addToFavourites = function (name, flag) {
  state.favourites.add(createSnippet(name, flag));
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
    console.log(state.history);
  } catch (error) {
    throw error;
  }
};
