import { markerLayer } from "../Helpers/load_geojson.js";
import { leftSideBar, map } from "../index.js";
export default class SearchResult {
  constructor(parent) {
    this.parent = parent;
    console.log(this.parent);
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
            <img src="${location.href}/${item.feature.properties.image}" alt="${
      item.feature.properties.name
    }" class="search-image">
            <div class="search-info">
                <h4 class="search-name">${item.feature.properties.name}</h4>
                ${
                  item.feature.properties.address
                    ? `<p class="search-address">${item.feature.properties.address}</p>`
                    : "<p class='search-address'>No address</p>"
                }
            </div>
        `;
    searchItem.addEventListener("click", (e) => {
      e.stopPropagation();
      // the surround the item and it marker with blue stroke
      document.querySelectorAll(".search-item").forEach((item) => {
        item.style.border = "none";
      });
      searchItem.style.border = "1px solid blue";

      markerLayer.eachLayer((marker) => {
        if (marker.feature.properties.name == item.feature.properties.name) {
          // change the marker icon size and animate it
          marker.setIcon(
            L.divIcon({
              html: `<div class="selected-pharmacy">
                <img src="${location.href}/assets/Images/selected-pharmacy-marker.png">
                <img src="${location.href}/${item.feature.properties.image}" alt="${item.feature.properties.name}">
              </div>`,
              className: "selected-pharmacy-container",
              iconSize: L.point(50, 50),
            })
          );
        }
      });

      map.setView(item.getLatLng(), 15);
      this.parent.classList.remove("input-focused");
      leftSideBar.classList.add("open");
    });
    return searchItem;
  }
}
