import L from "leaflet";
import {myMap} from "./MapBuilder";
import 'leaflet.heightgraph/dist/L.Control.Heightgraph';

export let segments;
let hg;

/**
 * renders marker and polyline of all segments found in the param to map
 *
 * @param topSegments array of segment objects returned by the draw selection
 * based on strava's top segments API
 */
export function renderSegments(topSegments) {

  if (topSegments.length > 0) {

    topSegments.forEach(function (s) {

      L.marker(s.start_latlng).addTo(myMap);

      L.polyline(
        L.Polyline.fromEncoded(s.points).getLatLngs(),
        {
          id: 'segment-polyline',
          color: 'red',
          weight: 2,
          opacity: .8,
          lineJoin: 'round',
          interactive: true,
        }).addTo(myMap);
    });

    segments = topSegments;

  }
}

/**
 * leaflet graph for elevation
 */
// https://github.com/GIScience/Leaflet.Heightgraph
export function renderElevationGraph(geojson) {

  let options = {
      width: 500,
      height: 250,

      margins: {
        top: 10,
        right: 30,
        bottom: 55,
        left: 50
      }

    };

  hg = L.control.heightgraph(options);
  hg.addTo(myMap);
  hg.addData(geojson);
  L.geoJson(geojson).addTo(myMap);

}

export function removeElevationGraph() {
  myMap.removeControl(hg);

}


/**
 *  helper function to remove all segment polylines and drawn shapes when
 *
 */
 export function removePolyLinesAndShapes()  {

  for (let i in myMap._layers) {
    if (myMap._layers[i].options.id !== "mapbox.streets") {
      myMap.removeLayer(myMap._layers[i]);
    }
  }
}

/**
 *  decode polyline from google's encoded algorithm to coordinates
 *  (because google's elevation API doesn't want to take the decoded polyline)
 */
export function decodePolyline(polyline) {
  return L.Polyline.fromEncoded(polyline);
}

/**
 * terrible hack to create the right url format for google's elevation API
 * because when passing in the encoded polyline, google's API doesn't work
 */
export function generateEncodedPolylineParam(decodedPolyline) {

  let formattedPolyline;
  decodedPolyline.getLatLngs().map(s => formattedPolyline += `${s.lat},${s.lng}|`);
  formattedPolyline = formattedPolyline.replace('undefined', '');
  formattedPolyline = formattedPolyline.slice(0, -1);
  return formattedPolyline;
}