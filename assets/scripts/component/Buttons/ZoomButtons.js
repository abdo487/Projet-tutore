import { map, rightSideBar } from '../../index.js';

export default class ZoomButtons {
    constructor() {
        this.button = document.createElement('div');
        this.button.className = "zoom-buttons";
        this.button.innerHTML = `
        <button class="zoom-in">
            <i class="fas fa-plus"></i>
        </button>
        <div class="zoom-separator"></div>
        <button class="zoom-out">
            <i class="fas fa-minus"></i>
        </button>
        `
        let buttons = this.button.getElementsByTagName("button")
        buttons[0].onclick = () => {
            map.zoomIn();
        }
        buttons[1].onclick = () => {
            map.zoomOut();
        }
        rightSideBar.appendChild(this.button);
    }
}