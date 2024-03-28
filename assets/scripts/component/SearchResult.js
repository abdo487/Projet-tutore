import { map } from "../index.js";
export default class SearchResult {
  constructor() {
    this.searchBody = document.createElement("div");
    this.searchBody.className = "search-body";
    this.searchBody.innerHTML = `
            <div class="search-title">Search Result</div>
            <div class="search-items-container">
              <p class="search-not-found">No result found</p>
            </div>
        `;
    this.searchItemsContainer = this.searchBody.querySelector(
      ".search-items-container"
    );
  }
  render_with(data) {
    this.searchItemsContainer.innerHTML = "";
    if (data.length == 0) {
      this.searchItemsContainer.innerHTML = `
            <div class="search-item">
                <p class="search-not-found">No result found</p>
            </div>
        `;
    } else {
      data.forEach((item) => {
        this.searchItemsContainer.appendChild(this.renderSearchItem(item));
      });
    }
  }

  renderSearchItem(item) {
    const searchItem = document.createElement("div");
    searchItem.className = "search-item";
    searchItem.innerHTML = `
            <img src="${location.href}/assets/Images/pharmacy-icon.png" alt="${
      item.feature.properties.name
    }" class="search-image">
            <div class="search-info">
                <h4 class="search-name">${item.feature.properties.name}</h4>
                ${
                  item.feature.properties.phone
                    ? `<p class="search-phone">${item.feature.properties.phone}</p>`
                    : ""
                }
            </div>
        `;
    searchItem.addEventListener("click", () => {
      map.setView(item.getLatLng(), 15);
    });
    return searchItem;
  }
}
