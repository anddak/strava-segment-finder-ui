import React, {useEffect} from 'react';
import L from 'leaflet';
import 'typeface-roboto';
import './styles.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import Grid from '@material-ui/core/Grid'
import SegmentsTable from "./SegmentsTable";
import {buildMap} from "./MapBuilder";
import {myMap} from "./MapBuilder";

export default function MapWrapper() {

  useEffect(() => buildMap());

  return (
    <div className="main-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div id="leaflet-container"/>
        </Grid>
        <Grid item xs={4}>
          <SegmentsTable test={myMap}/>
        </Grid>
      </Grid>
    </div>
  );

}
