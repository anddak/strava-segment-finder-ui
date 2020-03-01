import L from "leaflet";
import { renderElevationGraph, renderSegments } from "./MapUtils";
import "polyline-encoded";

/**
 *
 * @param SWBounds southwest corner latitutde, southwest corner longitude from map selection
 * @param NEBounds northeast corner latitude, northeast corner longitude from map selection
 */
export function getSegments(SWBounds, NEBounds) {
  const bounds = `${SWBounds.lat},${SWBounds.lng},${NEBounds.lat},${NEBounds.lng}`;

  fetch(`http://localhost:8081/api/v1/segments?bounds=${bounds}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(data => {
      renderSegments(data);
    });
}

/**
 * GET elevation data from google API
 * @param formated polyline list of lat-long
 */
export function fetchElevation(formattedPolyline) {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=${formattedPolyline}&key=${process.key.GOOGLE_MAPS_API}`
  ) //API key changed as security precaution
    .then(resp => resp.json())
    .then(data => {
      const geojson = [
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: data.results.map(c => [
                  c.location.lng,
                  c.location.lat,
                  c.elevation
                ])
              },
              properties: {}
            }
          ],
          properties: {
            Creator: "Andras Dako",
            records: 0,
            summary: "null"
          }
        }
      ];
      renderElevationGraph(geojson);
    });
}

//TODO: next steps: add marker at start of segments
//TODO: add location searchbar
//TODO: remove polygon, (add circle?)

//TODO: extract URL's
//TODO: handle/catch impl (if 204 then no results found, but this should also return a body text from the backend otherwise fetch will complain
