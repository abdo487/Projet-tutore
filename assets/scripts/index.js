import Map from "./component/Map.js";
import config from "./Config.js";

const map = new Map(document.getElementById("root")).map;
const customIcon = L.icon({
  iconUrl: location.href + "assets/Images/pharmacy-marker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50], // Anchor point for the icon (optional)
});

var markerLayer = L.layerGroup();
fetch(location.href + "rabat_pharmacies.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Add GeoJSON data to the map and filter markers by zoom level
    L.geoJSON(data, {
      filter: function (feature) {
        return map.getZoom() >= config.MARKERS_APPEAR_AT_ZOOM;
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: customIcon });
      },
      onEachFeature: function (feature, layer) {
        markerLayer.addLayer(layer); // Add marker to the layer group
      },
    }).addTo(map);
  })
  .catch((error) => {
    console.error("Error loading GeoJSON:", error);
  });

// Update marker visibility ON MAP LOADING
map.on("load", function () {
  if (map.getZoom() >= config.MARKERS_APPEAR_AT_ZOOM) {
    map.addLayer(markerLayer); // Add marker layer to the map
  } else {
    map.removeLayer(markerLayer); // Remove marker layer from the map
  }
});

// Update marker visibility based on zoom level
map.on("zoomend", function () {
  if (map.getZoom() >= config.MARKERS_APPEAR_AT_ZOOM) {
    // Change the zoom level as needed
    map.addLayer(markerLayer); // Add marker layer to the map
  } else {
    map.removeLayer(markerLayer); // Remove marker layer from the map
  }
});
