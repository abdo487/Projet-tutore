import { map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";
import MyArray from "../js/MyArray.js";
import SearchResult from "./SearchResult.js";

export default class SearchBox {
  constructor() {
    this.searchBox = document.createElement("div");
    this.searchBox.className = "search-box";
    this.searchBox.innerHTML = `
            <form class="search-form">
                <input type="text" class="search-input" placeholder="Search for pharmacies">
                <button class="search-button" type="submit">
                    <i class="fas fa-search"></i>
                </button>
                <button class="search-filter">
                    <i class="fas fa-filter"></i>
                </button>
            </form>
            <div class="result"></div>
        `;
    this.form = this.searchBox.querySelector(".search-form");
    this.input = this.searchBox.querySelector(".search-input");
    this.searchButton = this.searchBox.querySelector(".search-button");
    this.filterButton = this.searchBox.querySelector(".search-filter");
    this.result = this.searchBox.querySelector(".result");
    this.searchResult = new SearchResult(this.data);
    this.result.appendChild(this.searchResult.searchBody);

    this.form.addEventListener("submit", this.searchPharmacy.bind(this));
    document.getElementById("root").appendChild(this.searchBox);
    this.config()
  }

  config() {
    this.searchBox.addEventListener("click", (e) => {
      this.searchBox.classList.add("input-focused");
    });
    window.addEventListener("click", (e) => {
      if (!this.searchBox.contains(e.target)) {
        this.searchBox.classList.remove("input-focused");
      }
    });
  }

  async searchPharmacy(e) {
    e.preventDefault();
    let data = [];
    const searchValue = this.input.value?.toLowerCase();
    if (searchValue != "") {
      this.searchResult.searchItemsContainer.innerHTML =
        "<div class='loading'></div>";
        markerLayer.eachLayer((marker) => {
          if (marker.feature.properties.name?.toLowerCase().includes(searchValue)) {
            data.push(marker);
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.searchResult.render_with(data);
    }
  }
}
