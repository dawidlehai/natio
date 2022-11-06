import { capitalizeFirstLetter } from "../helpers.js";

class NationsView {
  _state;
  _parent = document.querySelector(".main");
  _tab = document.querySelector(".nations");

  render(state) {
    // this._state = state; // Do not need that for now
    this._tab.innerHTML = "";
    this._tab.insertAdjacentHTML(
      "afterbegin",
      this._generateHTML(state.country)
    );
    state.neighbours.forEach((country) => {
      this._tab.insertAdjacentHTML(
        "beforeend",
        this._generateHTML(country, "neighbour")
      );
    });
  }

  _generateHTML(country, cssClass = "main") {
    const common = country.name.common;
    const official = country.name.official;
    const flag = country.flags.png;
    // const arms = country.coatOfArms.svg;
    const arms = country.flags.png; //TODO restore SVG when servers are up
    const subregion = country.subregion;
    const [capital] = country.capital;
    let population = country.population;
    population =
      population >= 1_000_000
        ? `${Math.round(population / 1_000_000)} M`
        : `${Math.round(population / 1_000)} K`;
    const languages = Object.values(country.languages).join(", ");
    const currency = Object.values(Object.values(country.currencies)[0]);
    const currencyCode = Object.keys(country.currencies);
    const driveSide = capitalizeFirstLetter(country.car.side);

    return `
    <article class="nations__card nations__card--${cssClass}">
      <div class="nations__flag-container">
        <div class="nations__favourites-icon-container">
          <svg
            class="nations__favourites-icon nations__favourites-icon--add"
            width="24"
            height="24">
            <use xlink:href="img/icons.svg#heart-add-fill"></use>
          </svg>
        </div>
        <img
          class="nations__flag"
          src="${flag}"
          alt="Flag of ${common}" />
      </div>

      <div class="nations__info-container">
        <img
          class="nations__arms"
          src="${arms}"
          alt="Coats of arms of ${common}" />

        <hgroup class="nations__name-container">
          <h2 class="nations__common-name">${common}</h2>
          <p class="nations__official-name">${official}</p>
        </hgroup>

        <svg
          class="nations__icon"
          title="Region"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#map-pin"></use>
        </svg>
        <p class="nations__info">${subregion}</p>

        <svg
          class="nations__icon"
          title="Capital"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#building"></use>
        </svg>
        <p class="nations__info">${capital}</p>

        <svg
          class="nations__icon"
          title="Population"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#parent"></use>
        </svg>
        <p class="nations__info">${population}</p>

        <svg
          class="nations__icon"
          title="Languages"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#translate"></use>
        </svg>
        <p class="nations__info">${languages}</p>

        <svg
          class="nations__icon"
          title="Currency"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#currency"></use>
        </svg>
        <p class="nations__info">
          ${currency[0]} <span class="nations__currency">${currency[1]}</span>
          <span class="nations__currency">${currencyCode[0]}</span>
        </p>

        <svg
          class="nations__icon"
          title="Driving side"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#steering"></use>
        </svg>
        <p class="nations__info">${driveSide}</p>
      </div>

      <button class="btn nations__btn-map">
        <svg
          class="btn__icon nations__icon nations__icon--map"
          width="24px"
          height="24px">
          <use xlink:href="img/icons.svg#map"></use>
        </svg>
        Show on map
      </button>
    </article>
    `;
  }
}

export default new NationsView();
