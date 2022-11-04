import * as model from "./model.js";

const controlCountries = async function () {
  try {
    const query = window.location.search.replace("?query=", "");
    await model.loadCountryAndNeighbours(query);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
