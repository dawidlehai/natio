import * as model from "./model.js";

import nationsView from "./views/nationsView.js";

const controlCountries = async function () {
  try {
    const searchUrl = window.location.search;
    const query =
      (searchUrl.includes("?query=") && searchUrl.replace("?query=", "")) ||
      false;

    if (query) await model.loadCountryAndNeighbours(query);
    nationsView.render(model.state);
  } catch (error) {
    console.log(error);
  }
};

controlCountries();
