import { capitalizeFirstLetter } from "../helpers.js";

class NationsView {
  _parent = document.querySelector(".main");
  _tab = document.querySelector(".nations");

  addHandlerToggleFavourite(handler) {
    this._tab.addEventListener("click", function (e) {
      const btnFavourite = e.target.closest(".nations__favourites-icon");

      if (!btnFavourite) return;

      const parent = e.target.closest(".nations__card");
      const countryName = parent.querySelector(
        ".nations__common-name"
      ).textContent;
      const flagUrl = parent.querySelector(".nations__flag").src;

      handler(countryName, flagUrl);
    });
  }

  renderFavourites(favourites) {
    const cards = document.querySelectorAll(".nations__card");
    cards.forEach((card) => {
      const iconFavourite = card.querySelector(".nations__favourites-icon");
      const countryName = card.querySelector(
        ".nations__common-name"
      ).textContent;

      if (
        favourites.hasOwnProperty(countryName) &&
        iconFavourite.classList.contains("nations__favourites-icon--add")
      ) {
        iconFavourite.classList.remove("nations__favourites-icon--add");
        iconFavourite.classList.add("nations__favourites-icon--remove");
        iconFavourite.innerHTML = `<use xlink:href="img/icons.svg#heart-fill"></use>`;
      }

      if (
        !favourites.hasOwnProperty(countryName) &&
        iconFavourite.classList.contains("nations__favourites-icon--remove")
      ) {
        iconFavourite.classList.remove("nations__favourites-icon--remove");
        iconFavourite.classList.add("nations__favourites-icon--add");
        iconFavourite.innerHTML = `<use xlink:href="img/icons.svg#heart-add-fill"></use>`;
      }
    });
  }

  renderCountries(state) {
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
    const arms = country.coatOfArms.png;
    const subregion = country.subregion ?? country.region;
    const [capital] = country.capital ?? ["No capital"];
    let population = country.population;
    if (population >= 1_000_000)
      population = `${Math.round(population / 1_000_000)} M`;
    if (population >= 1_000 && population < 1_000_000)
      population = `${Math.round(population / 1_000)} K`;
    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "No official language";
    const [currencyName, currencySymbol] = country.currencies
      ? Object.values(Object.values(country.currencies)[0])
      : ["No official currency", null];
    const currencyCode = country.currencies
      ? Object.keys(country.currencies).join(", ")
      : null;
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
          ${currencyName} ${
      currencySymbol
        ? `<span class="nations__currency">${currencySymbol}</span>`
        : ""
    }
          ${
            currencyCode
              ? `<span class="nations__currency">${currencyCode}</span>`
              : ""
          }
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
