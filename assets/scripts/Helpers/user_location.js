import config from "../Config.js";
import LocateButton from '../component/LocateButton.js'

export default function locate_user(map) {
    // hide locate.control button
    let button = new LocateButton(map).button
  L.control
    .locate({
      drawCircle: false,
      drawMarker: false,
      showPopup: false,
      setView: true,
    })
    .addTo(map);

  map.on("locationfound", function (e) {
    map.setView([e.latitude, e.longitude], 15);

    let icon = L.icon({
      iconUrl: location.origin + "/assets/Images/location-marker.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });
    L.marker([e.latitude, e.longitude], { icon }).addTo(map);
  });
  map.on("locationerror", function (e) {
    console.error("Location access denied.");
  });
}
