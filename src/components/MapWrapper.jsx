import React, { useEffect} from 'react';
import L from 'leaflet';
import 'typeface-roboto';
import './styles.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import SegmentsTable from "./SegmentsTable";
import {buildMap} from "./MapBuilder";
import {myMap} from "./MapBuilder";

export default function MapWrapper() {

  useEffect(() => buildMap());

  return (
    <div>
      <div id="leaflet-container"/>
      <SegmentsTable test={myMap} />
    </div>
  );

}
