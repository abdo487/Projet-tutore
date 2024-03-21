export default class rightSideBar{
  constructor(){
    this.rightSideBar = document.createElement('div');
    this.rightSideBar.className = "right-side-bar";
    
    document.getElementById("root").appendChild(this.rightSideBar)
  }
}