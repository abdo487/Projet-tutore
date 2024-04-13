import { leftSideBar, map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";
import SearchResult from "./SearchResult.js";
import SearchFilters from "./SearchFilters.js";
import { Config } from "../Config.js";

export default class SearchBox {
  constructor() {
    this.fileter_menu_opened = false;
    this.searchBox = document.createElement("div");
    this.searchBox.className = "search-box input-focused";
    this.searchBox.innerHTML = `
            <form class="search-form">
                <input type="text" class="search-input" placeholder="Search for pharmacies">
                <button class="search-button" type="submit">
                    <i class="fas fa-search"></i>
                </button>
                <button class="search-filter" type="button">
                    ${
                      this.fileter_menu_opened
                        ? '<i class="fas fa-chevron-up"></i>'
                        : '<i class="fas fa-filter"></i>'
                    }
                </button>
            </form>
            <div class="result"></div>
        `;
    this.form = this.searchBox.querySelector(".search-form");
    this.input = this.searchBox.querySelector(".search-input");
    this.searchButton = this.searchBox.querySelector(".search-button");
    this.filterBtn = this.searchBox.querySelector(".search-filter");
    this.result = this.searchBox.querySelector(".result");
    this.searchResult = new SearchResult(this.searchBox);
    this.searchFilters = new SearchFilters(this);

    // initialize the search result
    this.result.appendChild(this.searchResult.searchBody);

    this.form.addEventListener("submit", this.searchPharmacy.bind(this));
    document.getElementById("root").appendChild(this.searchBox);
    this.config()
  }

  config() {
    this.searchBox.addEventListener("click", (e) => {
      this.searchBox.classList.add("input-focused");
      if(leftSideBar.sidebar.classList.contains("open")) {
        leftSideBar.sidebar.classList.remove("open");
      }
    });

    window.addEventListener("click", (e) => {
      if (!this.searchBox.contains(e.target)) {
        this.searchBox.classList.remove("input-focused");
      }
    });
    this.filterBtn.addEventListener("click", this.toggleFilterMenu.bind(this));
  }

  toggleFilterMenu() {
    this.fileter_menu_opened = !this.fileter_menu_opened;
    this.searchBox.classList.add("input-focused");
    if (leftSideBar.sidebar.classList.contains("open")) {
      leftSideBar.sidebar.classList.remove("open");
    }
    if(this.fileter_menu_opened) {
      this.filterBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      this.result.innerHTML = "";
      this.result.appendChild(this.searchFilters.searchFilters);
    } else { 
      this.filterBtn.innerHTML = '<i class="fas fa-filter"></i>';
      this.result.innerHTML = "";
      this.result.appendChild(this.searchResult.searchBody);
    }
    
  }

  async searchPharmacy(e) {
    e.preventDefault();
    if(this.fileter_menu_opened) {
      this.toggleFilterMenu();
    }
    let data = [];
    const searchValue = this.input.value;
    if (searchValue != "") {
      this.searchResult.searchItemsContainer.innerHTML =
        "<div class='loading'></div>";
        markerLayer.eachLayer((marker) => {
          if(Config.SEARCH_FILTERS.search_by_medication) {
            if(marker.feature.properties.medications?.includes(searchValue)) {
              data.push(marker);
            }
          } else {
            if (
              marker.feature.properties.name
                ?.toLowerCase()
                .includes(searchValue?.toLowerCase())
            ) {
              data.push(marker);
            }
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.searchResult.render_with(data);
    }
  }
}
