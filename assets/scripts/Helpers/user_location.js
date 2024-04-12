import config from "../Config.js";
import LocateButton from "../component/Buttons/LocateButton.js";
import { map, rightSideBar, leftSideBar } from "../index.js";

export let located = false;
export let locate_button = null;
export let locationDetails = null;

export default function locate_user() {
  locate_button = new LocateButton().button; // create locate button
  let layerMarker = L.layerGroup();
  let locationIcon = L.icon({
    iconUrl: location.href + "assets/Images/location-marker.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });
  let locationMarker = L.marker([0, 0], { icon: locationIcon });

  L.control
    .locate({
      drawCircle: false,
      drawMarker: false,
      showPopup: false,
      setView: true,
    })
    .addTo(map);

  // add locate button to the map
  locate_button.onclick = () => {
    locate_button.classList.toggle("located");
    if (!located) {
      map.locate({ setView: true, maxZoom: 16 });
      layerMarker.clearLayers();
      layerMarker.addLayer(locationMarker);
    } else {
      map.stopLocate();
      map.setView(config.CITY_COORDNATES, 14);
      layerMarker.clearLayers();
    }
    located = !located;
  };
  map.on("locationfound", function (e) {
    map.setView([e.latitude, e.longitude], 16);
    locationMarker.setLatLng([e.latitude, e.longitude]);
    locationDetails = e;
    leftSideBar.directionButton.click();
  });
  map.on("locationerror", function (e) {
    console.error("Location access denied.");
  });

  // add marker layer to the map
  map.addLayer(layerMarker);
}
