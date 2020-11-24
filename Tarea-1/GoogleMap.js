class GoogleMap {
    constructor(element, zoom, center) {
        this.map = new google.maps.Map(element, { zoom, center });
    }
    addMarker(position) {
        new google.maps.Marker({ position, map: this.map });
    }
    addPoly(coords) {
        new google.maps.Polygon({
            paths: coords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this.map
        });
    }
    addKMLFile(src) {
        this.getCoordsFromFile(src).then(result => {
            result.forEach(position => this.addPoly(position));
        });
    }
    async getCoordsFromFile(src) {
        const parser = new DOMParser();
        const str = await src.text();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const poly = [];
        for (const item of xmlDoc.getElementsByTagName('Placemark')) {
            const placePos = item.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
            const placePoints = placePos.split(" ");
            const googlePolygonsPaths = placePoints.map(point => point.split(',')).map(point => ({ lat: +point[1], lng: +point[0] }));
            poly.push(googlePolygonsPaths);
        }
        return poly;
    }
}