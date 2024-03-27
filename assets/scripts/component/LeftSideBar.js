import { map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";

export default class LeftSideBar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.className = "left-sidebar";
    this.sidebar.innerHTML = `
        <button class="left-sidebar-toggle">
            <i class="fas fa-chevron-right"></i>
        </button>
        `;
    this.openCloseButton = this.sidebar.querySelector(".left-sidebar-toggle");
    this.pharmacyList = this.sidebar.querySelector(".pharmacy-list");
    // document.getElementById("root").appendChild(this.sidebar);
  }
}
