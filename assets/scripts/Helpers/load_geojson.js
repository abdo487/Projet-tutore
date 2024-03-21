import config from '../Config.js';
import { map } from '../index.js';


export default function load_geojson() {
  var markerLayer = L.markerClusterGroup();
  const customIcon = L.icon({
    iconUrl: location.origin + "/Projet-tutore/assets/Images/pharmacy-marker.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50], // Anchor point for the icon (optional)
  });
  fetch(location.origin + "/Projet-tutore/rabat_pharmacies.geojson")
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

    
  // Update marker visibility based on zoom level
  map.on("zoomend", function () {
    if (map.getZoom() >= config.MARKERS_APPEAR_AT_ZOOM) {
      // Change the zoom level as needed
      map.addLayer(markerLayer); // Add marker layer to the map
    } else {
      map.removeLayer(markerLayer); // Remove marker layer from the map
    }
  });
}
