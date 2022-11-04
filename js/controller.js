import * as model from "./model.js";

const controlCountries = async function () {
  try {
    const query = window.location.search.replace("?query=", "");
    await model.loadCountryAndNeighbours(query);
    console.log(model.state.country);
    console.log(model.state.neighbours);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
