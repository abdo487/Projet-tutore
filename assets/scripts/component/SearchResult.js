import { map } from "../index.js";
export default class SearchResult {
  constructor(data) {
    this.data = data;
    this.searchBody = document.createElement("div");
    this.searchBody.className = "search-body";
    this.searchBody.innerHTML = `
            <div class="search-title">Search Result</div>
        `;

    this.data.addListener("change", this.changed.bind(this));
  }
  changed(item) {
    this.data.items.forEach((item) => {
      const searchItem = this.renderSearchItem(item);
      this.searchBody.appendChild(searchItem);
    });
  }

  renderSearchItem(item) {
    const searchItem = document.createElement("div");
    searchItem.className = "search-item";
    searchItem.innerHTML = `
            <img src="${location.href}/assets/Images/pharmacy-icon.png" alt="${item.feature.properties.name}" class="search-image">
            <div class="search-info">
                <h4 class="search-name">${item.feature.properties.name}</h4>
                <p class="search-address">${item.feature.properties.address}</p>
            </div>
        `;
    searchItem.addEventListener("click", () => {
      map.setView(item.getLatLng(), 15);
    });
    return searchItem;
  }
}
