import L from "leaflet";
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import {getSegments} from './MapFetch.js';
import {removePolyLinesAndShapes} from "./MapUtils";

export let myMap;
export let drawnItems;
export let drawControl;
export let drawControlEditOnly;

class ChainableMap {

  /**
   * Create map and set a default view
   * @param accessToken for the mapbox connection
   * @returns {ChainableMap}
   */
  declareMap(accessToken) {

    myMap = L.map('leaflet-container').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: accessToken
    }).addTo(myMap);

    return this;
  }

  /**
   * create the feature group for the toolbar
   * @returns {ChainableMap}
   */
  createFeatureGroup() {
    drawnItems = new L.FeatureGroup();
    myMap.addLayer(drawnItems);
    return this;
  }

  /**
   * create standard toolbar
   * @returns {ChainableMap}
   */
  createDrawControl() {
    drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        polygon: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        delete: false
      }
    });
    return this;
  }

  /**
   * create toolbar to restrict drawing and allow edit/delete when drawn on map
   * @returns {ChainableMap}
   */
  createEditOnlyDrawControl() {
     drawControlEditOnly = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        edit: false,
        delete: false
      },
       draw: {
         polyline: false,
         polygon: false,
         circle: false,
         marker: false,
         circlemarker: false,
       }
      // draw: false
    });
    return this;
  }

  /**
   * apply drawControl
   * @returns {ChainableMap}
   */
  addControl() {
    myMap.addControl(drawControl);
    return this;
  }

  /**
   * geolocate user
   * @returns {ChainableMap}
   */
  locateUser() {
    myMap.locate({setView: true, maxZoom: 16});
    return this;
  }

  /**
   * if blank map standard drawControl visible
   * if drawn, possible to draw, new draw would remove old polylines
   * getSegments calls to get top 10 segments from backend via fetch API
   * @returns {ChainableMap}
   */
  manageDraw() {
    myMap.on(L.Draw.Event.CREATED, function (e) {

     removePolyLinesAndShapes();

      drawnItems.addLayer(e.layer);
      drawControl.remove(myMap);
      drawControlEditOnly.addTo(myMap);
      getSegments(e.layer._bounds.getSouthWest(), e.layer._bounds.getNorthEast());
      });

    myMap.on(L.Draw.Event.DELETED, function(e) {

      removePolyLinesAndShapes();

      if (drawnItems.getLayers().length === 0){
        drawControlEditOnly.remove(myMap);
        drawControl.addTo(myMap);
      }
    });
    return this;
  }
}

export function buildMap() {
  const chainableMapInstance = new ChainableMap();
  chainableMapInstance
    .declareMap(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
    .createFeatureGroup()
    .createDrawControl()
    .createEditOnlyDrawControl()
    .addControl()
    .locateUser()
    .manageDraw()
}


//TODO: integrate sonarqube

