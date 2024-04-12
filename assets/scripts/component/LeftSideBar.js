import { map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";
import {
  located,
  locate_button,
  locationDetails,
} from "../Helpers/user_location.js";

export default class LeftSideBar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.className = "left-sidebar-container open";
    this.sidebar.innerHTML = `
      <div class="left-sidebar">
        <div class="left-sidebar-header">
          <img src="#">
          <div class="pharmacy-info">
            <h3>Pharmacy Name</h3>
            <p>Address</p>
    
            <div class="control-buttons">
              <button class="direction">
                <span>Get Direction</span>
                <i class="fas fa-directions"></i>
              </button>
              <button class="pharmacies">
                <i class="fas fa-map-marked-alt"></i>
                <span>Nearby Pharmacies</span>
              </button>
            </div>
          </div>
        </div>
        <div class="description">
          <h4>About</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quas, dolorum, voluptate, quos quod quia quibusdam tempore
            necessitatibus doloremque fugit.
          </p>
        </div>
        <div class="working-hours">
            <h4>Working Hours</h4>
            <div>
              <p>Monday - Friday: 8:00 - 17:00</p>
              <p>Saturday: 8:00 - 14:00</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div class="contact-info">
            <h4>Contact</h4>
            <p><i class="fas fa-phone"></i> <span>123456789</span></p>
            <p><i class="fas fa-envelope"></i> <span>
              <a href="mailto:someone@gmail.com"> someone@gmail.com</a>
            </span></p>
          </div>
      </div>
    `;

    this.sidebar.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.getElementById("root").appendChild(this.sidebar);
    this.directionButton = this.sidebar.querySelector(".direction");
  }

  render_with(data) {
    this.sidebar.querySelector(".left-sidebar-header img").src =
      data.properties.image;
    this.sidebar.querySelector(".pharmacy-info h3").textContent =
      data.properties.name;
    this.sidebar.querySelector(".pharmacy-info p").textContent = data.properties
      .address
      ? data.properties.address
      : "No address";
    this.sidebar.querySelector(".description p").textContent =
      data.properties.description;
    this.sidebar.querySelector(".contact-info p span").textContent = data
      .properties.phone
      ? data.properties.phone
      : "No phone";
    this.sidebar.querySelector(".contact-info p a").textContent = data
      .properties.email
      ? data.properties.email
      : "No email";
    this.sidebar.querySelector(".contact-info p a").href =
      "mailto:" + data.properties.email || "#";
    this.sidebar.querySelector(".working-hours div").innerHTML =
      this.renderTimeSchedule(data.properties.work_time);

    this.directionButton.addEventListener("click", () => {
      console.log(data);
      const [lat, lng] = data.geometry.coordinates;
      if (located) {
        let control = L.Routing.control({
          waypoints: [
            L.latLng(locationDetails.latitude, locationDetails.longitude),
            L.latLng(lat, lng),
          ],
          routeWhileDragging: true,
          show: false,
          lineOptions: {
            styles: [
              { color: "red", opacity: 1, weight: 10 },
              { color: "white", opacity: 1, weight: 5 },
            ],
          },
          createMarker: function (i, wp, n) {
            let marker = markerLayer.getLayers().find((marker) => {
              return marker.feature.properties.name === data.properties.name;
            });
            console.log(marker);
            return marker;
          },
        }).addTo(map);
      } else {
        locate_button.click();
        this.sidebar.classList.add("open");
      }
    });
  }
  renderTimeSchedule(time) {
    const days = Object.keys(time);
    const groupedDays = this.groupDaysByTime(time);

    let scheduleHTML = "<div>";

    groupedDays.forEach((group) => {
      if (group.days.length === 7) {
        scheduleHTML += `<p>Monday - Sunday: ${group.time}</p>`;
      } else if (
        group.days.length === 5 &&
        group.days.includes("monday") &&
        group.days.includes("tuesday") &&
        group.days.includes("wednesday") &&
        group.days.includes("thursday") &&
        group.days.includes("friday")
      ) {
        scheduleHTML += `<p>Monday - Friday: ${group.time}</p>`;
      } else {
        const renderedDays = group.days
          .map((day) => this.capitalizeFirstLetter(day))
          .join(" - ");
        scheduleHTML += `<p>${renderedDays}: ${group.time}</p>`;
      }
    });

    scheduleHTML += "</div>";
    return scheduleHTML;
  }

  groupDaysByTime(time) {
    const groupedDays = [];
    const uniqueTimes = [...new Set(Object.values(time))];

    uniqueTimes.forEach((uniqueTime) => {
      const daysWithSameTime = Object.keys(time).filter(
        (day) => time[day] === uniqueTime
      );
      groupedDays.push({ time: uniqueTime, days: daysWithSameTime });
    });

    return groupedDays;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
