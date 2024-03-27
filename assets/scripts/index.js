
import Map from "./component/Map.js";
import RightSideBar from "./component/RightSideBar.js";
import config from "./Config.js";
import load_geojson from "./Helpers/load_geojson.js";
import locate_user from "./Helpers/user_location.js"

export const rightSideBar = new RightSideBar().rightSideBar;
export const map = new Map(document.getElementById("root")).map;

// load pharmacies located in rabt in the map
load_geojson();
locate_user();

// // init the mapmode button
// new MapModeButton();