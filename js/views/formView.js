class FormView {
  _parent = document.querySelector(".form");
  _btnRandom = document.querySelector(".search__random-btn");
  _searchInput = document.querySelector("#search-input");

  addHandlerRandom(handler) {
    this._btnRandom.addEventListener("click", handler);
  }

  addHandlerSearch(handler) {
    this._parent.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._searchInput.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchInput.value = "";
  }
}

export default new FormView();
