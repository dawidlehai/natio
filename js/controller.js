import * as model from "./model.js";

import nationsView from "./views/nationsView.js";
import progressView from "./views/progressView.js";

import { isEmptyObject } from "./helpers.js";

const controlCountries = async function () {
  try {
    const searchUrl = window.location.search;
    const query =
      (searchUrl.includes("?query=") && searchUrl.replace("?query=", "")) ||
      false;

    if (!query && isEmptyObject(model.state.country)) return;
    if (query) await model.loadCountryAndNeighbours(query);

    progressView.render(model.state.history);
    nationsView.render(model.state);
    console.log(model.state);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
