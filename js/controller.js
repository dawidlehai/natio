import * as model from "./model.js";

import nationsView from "./views/nationsView.js";

import { isEmptyObject } from "./helpers.js";

const controlCountries = async function () {
  try {
    const searchUrl = window.location.search;
    const query =
      (searchUrl.includes("?query=") && searchUrl.replace("?query=", "")) ||
      false;

    if (!query && isEmptyObject(model.state.country)) return;
    if (query) await model.loadCountryAndNeighbours(query);

    nationsView.render(model.state);
    console.log(model.state);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
