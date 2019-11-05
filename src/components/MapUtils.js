import L from "leaflet";
import {myMap} from "./MapBuilder";

/**
 * renders to map all segments found in the param
 *
 * @param topSegments array of segment objects returned by the draw selection
 * based on strava's top segments API
 */
export function renderSegmentPolylines(topSegments) {

  if (topSegments.length > 0) {

    topSegments.forEach(s =>

      L.polyline(
        L.Polyline.fromEncoded(s.points).getLatLngs(),
        {
          id: 'segment-polyline',
          color: 'red',
          weight: 2,
          opacity: .8,
          lineJoin: 'round',
          interactive: true,
        }
      ).addTo(myMap));

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