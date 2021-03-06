class GoogleMap {
    constructor(element, zoom, center) {
        this.map = new google.maps.Map(element, { zoom, center });
        this.polys = [];
    }
    addMarker(position) {
        new google.maps.Marker({ position, map: this.map });
    }
    addPoly(coords) {
        this.polys.push(new google.maps.Polygon({
            paths: coords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this.map
        }));
    }
    addKMLFile(src) {
        this.polys.forEach(poly=>poly.setMap(null));
        this.polys = [];
        this.getCoordsFromFile(src).then(result => {
            result.forEach(position => this.addPoly(position));
        });
    }
    async getCoordsFromFile(src) {
        const parser = new DOMParser();
        const str = await src.text();
        const doc = parser.parseFromString(str, "text/xml");
        return Array.from(doc.getElementsByTagName('Placemark'))
            .map(placemark => placemark.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim().split(' ')
                .map(point => point.split(',')).map(point => ({ lat: +point[1], lng: +point[0] })));
    }
}