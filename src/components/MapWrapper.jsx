import React, {useEffect} from 'react';
import L from 'leaflet';
import './styles.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import {buildMap} from "./MapUtils";

export default function MapWrapper() {

  useEffect(() => buildMap());

      return (
      <div id="leaflet-container">
      </div>
    );

}