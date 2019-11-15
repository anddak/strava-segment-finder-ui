import L from "leaflet";
import {myMap} from "./MapBuilder";

export let segments;

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