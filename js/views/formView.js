class FormView {
  _parent = document.querySelector(".form");
  _btnRandom = document.querySelector(".search__random-btn");
  _searchInput = document.querySelector("#search-input");
  _formList = document.querySelector(".form__list");

  addHandlerRandom(handler) {
    this._btnRandom.addEventListener("click", handler);
  }

  addHandlerSearchSubmit(handler) {
    this._parent.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSearchTyping(handler) {
    this._searchInput.addEventListener("input", handler);
    this._searchInput.addEventListener("focusin", handler);
    this._searchInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") console.log("down");
    });
  }

  addHandlerSearchLostFocus() {
    function checkAndClear(e) {
      const form = e.target.closest(".form");
      if (form) return;

      this.clearSuggestions();
    }
    document.body.addEventListener("click", checkAndClear.bind(this));
    document.body.addEventListener("focusin", checkAndClear.bind(this));
  }

  getQuery() {
    const query = this._searchInput.value;
    return query;
  }

  renderSuggestions(suggestions) {
    this.clearSuggestions();
    suggestions.forEach((option) =>
      this._formList.insertAdjacentHTML("beforeend", this._generateHTML(option))
    );
  }

  clearSuggestions() {
    this._formList.innerHTML = "";
  }

  clearInput() {
    this._searchInput.value = "";
  }

  _generateHTML(country) {
    return `<li class="form__option" tabindex="0" data-country="${country}">${country}</li>`;
  }
}

export default new FormView();
