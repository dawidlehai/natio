class ProgressView {
  _parent = document.querySelector(".main");
  _tab = document.querySelector(".progress");
  _snippetContaier = document.querySelector(".progress__snippet-container");

  render(history) {
    this._snippetContaier.innerHTML = "";
    for (const [common, flag] of Object.entries(history)) {
      this._snippetContaier.insertAdjacentHTML(
        "beforeend",
        this._generateHTML(common, flag)
      );
    }
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
