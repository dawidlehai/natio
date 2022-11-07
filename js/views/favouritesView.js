class FavouritesView {
  _parent = document.querySelector(".main");
  _tab = document.querySelector(".favourites");
  _snippetContainer = document.querySelector(".favourites__snippet-container");

  render(favourites) {
    this._snippetContainer.innerHTML = "";
    for (const [common, flag] of Object.entries(favourites)) {
      this._snippetContainer.insertAdjacentHTML(
        "beforeend",
        this._generateHTML(common, flag)
      );
    }
  }

  addHandlerRemoveFavourite(handler) {
    this._snippetContainer.addEventListener("click", function (e) {
      const btnSnippet = e.target.closest(".snippet__icon");

      if (!btnSnippet) return;

      const countrySnippet = e.target.closest(".snippet");
      const countryName =
        countrySnippet.querySelector(".snippet__name").dataset.countryName;

      handler(countryName);
    });
  }

  addHandlerLoadCountry(handler) {
    this._snippetContainer.addEventListener("click", function (e) {
      const btnSnippet = e.target.closest(".snippet__icon");
      if (btnSnippet) return;

      const countrySnippet = e.target.closest(".snippet");
      if (!countrySnippet) return;

      const countryName =
        countrySnippet.querySelector(".snippet__name").dataset.countryName;

      handler(countryName);
    });
  }

  _generateHTML(common, flag) {
    return `
      <figure class="snippet">
        <div class="snippet__img-container">
          <div class="snippet__icon-container">
            <svg
              class="snippet__icon snippet__icon--dislike"
              width="24px"
              height="24px">
              <use xlink:href="img/icons.svg#dislike-fill"></use>
            </svg>
          </div>
          <img
            class="snippet__flag"
            src="${flag}"
            alt="Flag of ${common}" />
        </div>
        <figcaption class="snippet__name" data-country-name="${common}">
          ${common}
        </figcaption>
      </figure>
    `;
  }
}

export default new FavouritesView();
