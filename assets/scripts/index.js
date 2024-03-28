import Map from "./component/Map.js";
import load_geojson from "./Helpers/load_geojson.js";
import locate_user from "./Helpers/user_location.js";
import SearchBox from "./component/SearchBox.js";
import RightSideBar from "./component/RightSideBar.js";

export const searchForm = new SearchBox().searchBox;
export const rightSideBar = new RightSideBar().rightSideBar;
export const map = new Map(document.getElementById("root")).map;

// load pharmacies located in rabt in the map
load_geojson();
locate_user();
