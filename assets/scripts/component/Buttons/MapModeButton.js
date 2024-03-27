import { map, rightSideBar } from "../../index.js";

export default class MapModeButton {
  constructor() {
    this.mapType = "street"; // Initialize with street view

    this.button = document.createElement("button");
    this.button.className = "map-mode";
    this.button.innerHTML = `
      <i class="fas fa-map"></i>
    `;
    this.button.onclick = () => {
      this.toggleMapType();
    };
    rightSideBar.appendChild(this.button);
  }

  toggleMapType() {
    if (this.mapType === "street") {
      map.setView(map.getCenter(), map.getZoom(), "satellite"); // Switch to satellite
      this.button.innerHTML = `<i class="fas fa-street-view"></i>`; // Update icon
    } else {
      map.setView(map.getCenter(), map.getZoom(), "street"); // Switch back to street
      this.button.innerHTML = `<i class="fas fa-map"></i>`; // Update icon
    }
    this.mapType = this.mapType === "street" ? "satellite" : "street"; // Toggle mapType state
  }
}
