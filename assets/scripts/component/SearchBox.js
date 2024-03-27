import { map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";
import MyArray from "../js/MyArray.js";
import SearchResult from "./SearchResult.js";

export default class SearchBox {
  constructor() {
    this.data = new MyArray();

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
  }

  searchPharmacy(e) {
    e.preventDefault();
    this.data.clear();

    const searchValue = this.input.value?.toLowerCase();
    if (searchValue === "") return;
    markerLayer.eachLayer((marker) => {
      if (marker.feature.properties.name?.toLowerCase().includes(searchValue)) {
        this.data.addItem(marker);
        marker.addTo(map);
      } else {
        marker.removeFrom(map);
      }
    });
  }
}
