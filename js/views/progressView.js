class ProgressView {
  _parent = document.querySelector(".main");
  _tab = document.querySelector(".progress");
  _snippetContainer = document.querySelector(".progress__snippet-container");

  render(history) {
    this._snippetContainer.innerHTML = "";
    for (const [common, flag] of Object.entries(history)) {
      this._snippetContainer.insertAdjacentHTML(
        "beforeend",
        this._generateHTML(common, flag)
      );
    }
  }

  addHandlerLoadCountry(handler) {
    this._snippetContainer.addEventListener("click", function (e) {
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

export default new ProgressView();
