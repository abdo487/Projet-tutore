import config from "../Config.js";
import LocateButton from '../component/Buttons/LocateButton.js'
import {map, rightSideBar} from '../index.js';

export default function locate_user() {
  let button = new LocateButton().button // create locate button
  let switchLocate = false;
  let layerMarker = L.layerGroup();
  let locationIcon = L.icon({
    iconUrl: location.origin + "/Projet-tutore/assets/Images/location-marker.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });
  let locationMarker = L.marker([0,0], { icon: locationIcon })

  L.control
    .locate({
      drawCircle: false,
      drawMarker: false,
      showPopup: false,
      setView: true,
    })
    .addTo(map);

  // add locate button to the map
  button.onclick = () => {
    button.classList.toggle("located");
    if (!switchLocate) {
      map.locate({ setView: true, maxZoom: 16 });
      layerMarker.clearLayers();
      layerMarker.addLayer(locationMarker);
    } else {
      map.stopLocate();
      map.setView(config.CITY_COORDNATES, 14)
      layerMarker.clearLayers();
    }
    switchLocate = !switchLocate;
  };
  map.on("locationfound", function (e) {
    map.setView([e.latitude, e.longitude], 16);
    locationMarker.setLatLng([e.latitude, e.longitude]);
  });
  map.on("locationerror", function (e) {
    console.error("Location access denied.");
  });

  // add marker layer to the map
  map.addLayer(layerMarker);
}
