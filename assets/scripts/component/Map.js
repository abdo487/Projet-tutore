class Map {
  constructor(parent) {
    this.parent = parent;

    this.map = null;
    this.div = document.createElement("div");
    this.div.id = "map";
    this.div.className = "map";
    this.parent.appendChild(this.div);

    this.initMap();
  }
  initMap() {
    this.map = L.map("map", { zoomControl: false }).setView(
      [34.01325, -6.83255],
      14
    );

    // Adding the OpenStreetMap tiles to the map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }
}

export default Map;
