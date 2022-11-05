import * as model from "./model.js";

const controlCountries = async function () {
  try {
    const searchUrl = window.location.search;
    const query =
      (searchUrl.includes("?query=") && searchUrl.replace("?query=", "")) ||
      false;

    if (query) await model.loadCountryAndNeighbours(query);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
