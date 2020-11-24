var initializer = new Object();
let controller;
class Controller {
    constructor(map, fileBrowser) {
        this.map = map;
        this.fileBrowser = fileBrowser;
    }
    addKml(){
        this.map.addKMLFile(this.fileBrowser.files[0]);
    }
}
initializer.do = function () {
    navigator.geolocation.getCurrentPosition(position => {
        const pG = { lat: position.coords.latitude, lng: position.coords.longitude };
        controller = new Controller(new GoogleMap(document.getElementById('map'), 8, pG),document.getElementById('upload'));
    });
};