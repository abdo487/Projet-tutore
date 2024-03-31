import { map } from "../index.js";
import { markerLayer } from "../Helpers/load_geojson.js";

export default class LeftSideBar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.className = "left-sidebar-container open";
    this.sidebar.innerHTML = `
      <div class="left-sidebar">
        <div class="left-sidebar-header">
          <img src="assets/pharmacy_images/493069.png">
          <div class="pharmacy-info">
            <h3>Pharmacy Name</h3>
            <p>Address</p>
    
            <div class="control-buttons">
              <button class="direction">Get Direction</button>
              <button class="pharmacies">Nearby Pharmacies</button>
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
        <div class="addition-info">
          <div class="working-hours">
            <h4>Working Hours</h4>
            <p>Monday - Friday: 8:00 - 17:00</p>
            <p>Saturday: 8:00 - 14:00</p>
            <p>Sunday: Closed</p>
          </div>
          <div class="contact-info">
            <h4>Contact</h4>
            <p>Phone: <span>123456789</span></p>
            <p>Email: <span>
              <a href="mailto:someone@gmail.com"> someone@gmail.com</a>
            </span></p>
          </div>
        </div>
        <div class="control-buttons">
          <button class="direction">Get Direction</button>
          <button class="pharmacies">Nearby Pharmacies</button>
        </div>
      </div>
    `;
    this.pharmacies = this.sidebar.querySelector(".pharmacies");
    this.closeButton = this.sidebar.querySelector(".close-sidebar");

    this.sidebar.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.getElementById("root").appendChild(this.sidebar);
  }
}
