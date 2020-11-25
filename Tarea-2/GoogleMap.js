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
    addGeoJSONFile(src) {
        this.polys.forEach(poly => poly.setMap(null));
        this.polys = [];
        this.getCoordsFromFile(src).then(result => {
            result.forEach(position => this.addPoly(position));
        });
    }
    async getCoordsFromFile(src) {
        const str = await src.text();
        const geo = JSON.parse(str);
        return geo.features.map(feature => feature.geometry.coordinates
            .map(coordinates => ({ lat: coordinates[1], lng: coordinates[0] })));
    }
}