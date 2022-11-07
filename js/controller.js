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

    if (!query && isEmptyObject(model.state.country)) return;
    if (query) await model.loadCountryAndNeighbours(query);

    progressView.render(model.state.history);
    nationsView.renderCountries(model.state);
    nationsView.renderFavourites(model.state.favourites);
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

const controlFavourites = function (name, flag) {
  model.toggleFavourites(name, flag);
  nationsView.renderFavourites(model.state.favourites);
};

controlCountries();

const init = function () {
  formView.addHandlerRandom(controlRandom);
  formView.addHandlerSearch(controlSearch);
  nationsView.addHandlerToggleFavourite(controlFavourites);
};

init();
