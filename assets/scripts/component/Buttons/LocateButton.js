import { map, rightSideBar } from '../../index.js';
export default class LocateButton{
    constructor(){
        this.button = document.createElement('button');
        this.button.className = "locate-button";
        this.button.innerHTML = "<i class='fas fa-location-crosshairs'></i>"

        rightSideBar.appendChild(this.button)
    }
}