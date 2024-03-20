export default class LocateButton{
    constructor(map){
        this.map = map;
        this.button = document.createElement('button');
        this.button.className = "locate-button";
        this.button.innerHTML = "<i class='fas fa-location-crosshairs'></i>"


        document.getElementById("root").appendChild(this.button)
        this.button.addEventListener('click', this.mapLocate.bind(this))
    }
    mapLocate(){
        this.map.locate({
            setView: true,
            maxZoom: 16,
        });
    }
}