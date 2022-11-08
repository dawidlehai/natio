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
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const options = document.querySelectorAll(".form__option");

        if (!options[0]) return;
        options[0].focus();

        options.forEach(function (option) {
          option.addEventListener("keydown", function (e) {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              const nextEl = option.nextElementSibling;

              if (!nextEl) return;
              nextEl.focus();
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              const prevEl = option.previousElementSibling;

              if (!prevEl) {
                document.querySelector("#search-input").focus();
                return;
              }
              prevEl.focus();
            }
          });
        });
      }
    });
  }

  addHandlerSubmitSuggestion(handler) {
    this._formList.addEventListener("click", function (e) {
      pasteSuggestion(e, handler);
    });
    this._formList.addEventListener("keydown", function (e) {
      pasteSuggestionEnter(e, handler);
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

function pasteSuggestion(e, handler) {
  e.preventDefault();
  const option = e.target.closest(".form__option");
  if (!option) return;

  const country = option.dataset.country;
  const searchInput = document.querySelector("#search-input");
  searchInput.value = country;
  searchInput.focus();
  clearSuggestions();
  handler();
}

function pasteSuggestionEnter(e, handler) {
  if (e.key !== "Enter") return;

  pasteSuggestion(e, handler);
}

function clearSuggestions() {
  document.querySelector(".form__list").innerHTML = "";
}

export default new FormView();
