import { map, rightSideBar } from '../../index.js';

export default class ZoomButtons {
    constructor() {
        this.button = document.createElement('div');
        this.button.className = "zoom-buttons";
        this.button.innerHTML = `
        <button class="zoom-in">
            <i class="fas fa-plus"></i>
        </button>
        <button class="zoom-out">
            <i class="fas fa-minus"></i>
        </button>
        `
        this.button.onclick = (e) => {
            console.log(e.target.className);
            if (e.target.className === "zoom-in") {
                map.setZoom(map.getZoom() + 1);
            } else if (e.target.className === "zoom-out") {
                map.setZoom(map.getZoom() - 1);
            }
        }
        rightSideBar.appendChild(this.button);
    }
}