import * as model from "./model.js";

import nationsView from "./views/nationsView.js";
import progressView from "./views/progressView.js";
import formView from "./views/formView.js";

import { isEmptyObject, updateUrl } from "./helpers.js";

const controlCountries = async function () {
  try {
    const searchUrl = window.location.search;
    const query =
      (searchUrl.includes("?query=") && searchUrl.replace("?query=", "")) ||
      false;

    console.log(query);

    if (!query && isEmptyObject(model.state.country)) return;
    if (query) await model.loadCountryAndNeighbours(query);

    progressView.render(model.state.history);
    nationsView.render(model.state);
    console.log(model.state);
  } catch (error) {
    console.log(`${error} - MY ERR`);
  }
};

const controlRandom = function () {
  const randomCountry = model.generateRandomCountry();
  updateUrl(randomCountry);

  controlCountries();
};

const controlSearch = function () {
  const query = formView.getQuery();
  updateUrl(query);

  controlCountries();
};

controlCountries();

const init = function () {
  formView.addHandlerRandom(controlRandom);
  formView.addHandlerSearch(controlSearch);
};

init();
