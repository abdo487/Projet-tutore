import Map from "./component/Map.js";
import config from "./Config.js";
import load_geojson from "./Helpers/load_geojson.js";
import locate_user from "./Helpers/user_location.js"

const map = new Map(document.getElementById("root")).map;

// load pharmacies located in rabt in the map
load_geojson(map);
locate_user(map);