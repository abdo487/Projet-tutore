import { leftSideBar  } from "../index.js";
export default class SelectedMarker {
  constructor(map) {
    this.map = map;
    this.oldMarker = null;
    this.selectedMarker = null;
    this.markerLayer = L.layerGroup(); // this will always only contain one marker at a time

    this.map.addLayer(this.markerLayer);

    map.on("click", () => {
      this.reset();
      leftSideBar.sidebar.classList.remove("open");
    });
  }
  setSelectedMarker(item, marker) {
    if (this.oldMarker) {
      this.oldMarker.setOpacity(1);
    }
    if (this.selectedMarker) {
      this.markerLayer.removeLayer(this.selectedMarker);
    }
    this.selectedMarker = L.marker([item.feature.geometry.coordinates[1], item.feature.geometry.coordinates[0]], {
      icon: this.selectedMarkerIcon(item),
    });
    this.selectedMarker.on("click", (e) => {});
    this.markerLayer.addLayer(this.selectedMarker);
    this.oldMarker = marker;
    marker.setOpacity(0);
  }
  selectedMarkerIcon(item) {
    return L.divIcon({
      html: `<div class="selected-pharmacy">
                <img src="${location.href}/assets/Images/selected-pharmacy-marker.png">
                <img src="${location.href}/${item.feature.properties.image}" alt="${item.feature.properties.name}">
              </div>`,
      className: "selected-pharmacy-container",
      iconSize: L.point(50, 50),
    });
  }

  reset() {
    if (this.oldMarker) {
      this.oldMarker.setOpacity(1);
    }
    if (this.selectedMarker) {
      this.markerLayer.removeLayer(this.selectedMarker);
    }
  }
}
