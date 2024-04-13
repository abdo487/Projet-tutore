import { markerLayer, originalMarkerLayer } from "../Helpers/load_geojson.js";
import { Config } from "../Config.js";

export default class SearchFilters {
  constructor(searchForm) {
    this.searchform = searchForm;
    this.searchFilters = document.createElement("div");
    this.searchFilters.className = "search-filters";
    this.searchFilters.innerHTML = `
        <h4>Filters</h4>
        <form class="filter-form">
            <div class="filter-item-select">
                <span>Search By:</span>
                <select name="search-by" class="search-by">
                    <option value="name">Pharmacy Name</option>
                    <option value="medication">Medication</option>
                </select>
            </div>
            <h5>Filter by time</h5>
            <div class="filter-items">
                <div class="filter-item">
                    <input type="checkbox" name="filter" class="all" id="all">
                    <label for="all">All</label>
                </div>
                <div class="filter-item">
                    <input type="checkbox" name="filter" class="open-now" id="open-now">
                    <label for="open-now">Open Now</label>
                </div>
                <div class="filter-item">
                    <input type="checkbox" name="filter" class="_24h" id="_24h">
                    <label for="_24h">24h</label>
                </div>
            </div>
        </form>
    `;
    this.form = this.searchFilters.querySelector(".filter-form");
    this.searchBy = this.searchFilters.querySelector(".search-by");
    this.allBtn = this.searchFilters.querySelector(".all");
    this.openNowBtn = this.searchFilters.querySelector(".open-now");
    this.twentyFourBtn = this.searchFilters.querySelector("._24h");

    this.config();
  }

  config() {
    let filters = Config.SEARCH_FILTERS;
    this.searchBy.value = filters.search_by_medication ? "medication" : "name";
    this.allBtn.checked = filters.all;
    this.openNowBtn.checked = filters.open_now;
    this.twentyFourBtn.checked = filters.twenty_four;

    this.searchBy.addEventListener("change", (e) => {
      filters = {
        ...filters,
        search_by_medication: e.target.value === "medication",
      };
      Config.SEARCH_FILTERS = filters;
    });

    [this.allBtn, this.openNowBtn, this.twentyFourBtn].forEach((btn) => {
      btn.addEventListener("change", (e) => {
        if (e.target.checked) {
          [this.allBtn, this.openNowBtn, this.twentyFourBtn].forEach((btn) => {
            if (btn !== e.target) {
              btn.checked = false;
            }
            // change the value of the filter
          });
        } else {
            let btn = [this.allBtn, this.openNowBtn, this.twentyFourBtn].reduce((acc, btn) => {
                if (btn.checked) {
                    return acc + 1;
                }
                return acc;
            });
            btn.checked = true;
        }
        filters = {
          ...filters,
          all: this.allBtn.checked,
          open_now: this.openNowBtn.checked,
          twenty_four: this.twentyFourBtn.checked,
        };
        Config.SEARCH_FILTERS = filters;
        this.updateMarkers();
      });
    });
  }

  updateMarkers() {
    let filters = Config.SEARCH_FILTERS;
    let data = [];
    let daysName = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    let today = new Date().getDay();
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    let currentTime = currentHour + currentMinute / 60;
    let dayName = daysName[today - 1];

    originalMarkerLayer.eachLayer((marker) => {
      if (filters.all) {
        data.push(marker);
      } else {
        if (filters.open_now) {
          // check if the pharmacy is open now
          if (marker.feature.properties.work_time) {
            let workTime = marker.feature.properties.work_time;

            if (workTime[dayName]) {
              let [start, end] = workTime[dayName].split("-").map((time) => {
                let [hour, minute] = time.split(":");
                return parseInt(hour) + parseInt(minute) / 60;
              });
              if (currentTime >= start && currentTime <= end) {
                data.push(marker);
              }
            }
          }
        }
        if (filters.twenty_four) {
          if (marker.feature.properties.work_time) {
            let workTime = marker.feature.properties.work_time;
            for (let day in workTime) {
              if (workTime[day] === "00:00-00:00") {
                data.push(marker);
              }
            }
          }
        }
      }
    });

    markerLayer.clearLayers();
    data.forEach((marker) => {
      markerLayer.addLayer(marker);
    });
  }
}
