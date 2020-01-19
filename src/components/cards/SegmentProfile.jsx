import React from "react";
import L from "leaflet";
import {Card, CardContent, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {decodePolyline} from "../../js/MapUtils";
// import Polyline from "react-polyline";



export default function SegmentProfile({segmentDetails}) {

  const {
    distance,
    average_grade,
    elevation_low,
    elevation_high,
    total_elevation_gain,
  } = segmentDetails;

   const {map: {polyline}} = segmentDetails;

   const decodedPolylines = () => {
     const formattedPolyline = [];
     decodePolyline(polyline).getLatLngs().map(s => formattedPolyline.push({x: s.lat, y: s.lng}))
     return formattedPolyline;
   };




  return (
    <>
      {segmentDetails ?
        (
          <div>
            <Card>
              <CardContent>
                <Typography variant="h6">Segment profile</Typography>
                {/*<Polyline coordinates={decodedPolylines} style="5px solid orange"/>*/}
              </CardContent>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">{distance} m</Typography>
                    <Typography variant="body1">{average_grade} % average grade</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Lowest elevation: {elevation_low}</Typography>
                    <Typography variant="body1">Highest elevation: {elevation_high}</Typography>
                    <Typography variant="body1">{total_elevation_gain} elevation gain.</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>) : 'No data to show'}
    </>
  )
}