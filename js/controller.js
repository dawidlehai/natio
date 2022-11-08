import * as model from "./model.js";

import nationsView from "./views/nationsView.js";
import progressView from "./views/progressView.js";
import favouritesView from "./views/favouritesView.js";
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

    nationsView.renderCountries(model.state);
    nationsView.renderFavourites(model.state.favourites);

    progressView.render(model.state.history);
    favouritesView.render(model.state.favourites);
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
  formView.clearInput();
  updateUrl(query);

  controlCountries();
};

const controlSearchSuggestions = function () {
  const query = formView.getQuery();
  if (!query) {
    formView.clearSuggestions();
    return;
  }

  const suggestions = model.generateSuggestions(query);
  formView.renderSuggestions(suggestions);
};

const controlFavourites = function (name, flag) {
  model.toggleFavourites(name, flag);
  nationsView.renderFavourites(model.state.favourites);
  favouritesView.render(model.state.favourites);
};

const controlLoadCountry = function (name) {
  updateUrl(name);
  controlCountries();
};

controlCountries();

const init = function () {
  formView.addHandlerRandom(controlRandom);
  formView.addHandlerSearchSubmit(controlSearch);
  formView.addHandlerSubmitSuggestion(controlSearch);
  formView.addHandlerSearchTyping(controlSearchSuggestions);
  formView.addHandlerSearchLostFocus();
  nationsView.addHandlerToggleFavourite(controlFavourites);
  favouritesView.addHandlerRemoveFavourite(controlFavourites);
  favouritesView.addHandlerLoadCountry(controlLoadCountry);
  progressView.addHandlerLoadCountry(controlLoadCountry);
};

init();
