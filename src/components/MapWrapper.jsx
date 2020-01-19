import React, {useEffect} from 'react';
import L from 'leaflet';
import 'typeface-roboto';
import './styles.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import Grid from '@material-ui/core/Grid'
import SegmentsWrapper from "./SegmentsWrapper";
import {buildMap} from "../js/MapBuilder";
import {myMap} from "../js/MapBuilder";
import Paper from '@material-ui/core/Paper';

export default function MapWrapper() {

  useEffect(() => buildMap());

  return (
    <div className="main-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper>
          <div id="leaflet-container"/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <SegmentsWrapper test={myMap}/>
        </Grid>
      </Grid>
    </div>
  );

}
