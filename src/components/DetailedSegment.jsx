import React, {useState} from 'react';
import * as d3 from 'd3';
import L from "leaflet";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment';
import {myMap} from "./MapBuilder";
import {renderSegments} from "./MapUtils";
import {renderElevationGraph} from "./MapUtils";
import ElevationChart from "./ElevationChart";
import 'leaflet.heightgraph/dist/L.Control.Heightgraph'
import 'leaflet.heightgraph/dist/L.Control.Heightgraph.min.css';

export default function DetailedSegment({hideDetail, segmentDetails, showDetail}) {



    // /**
    //  *  decode polyline (because google's elevation API doesn't want to take the decoded polyline)
    //  */
    // let polyline;
    // if (segmentDetails && segmentDetails.map) {
    //   const encoded = segmentDetails.map.polyline;
    //   polyline = L.Polyline.fromEncoded(encoded);
    //
    //   /**
    //    * terrible hack to create the right url format for google's elevation API because of the above reason
    //    */
    //   let encodedPolyline;
    //   polyline.getLatLngs().map(s => encodedPolyline += `${s.lat},${s.lng}|`);
    //   encodedPolyline = encodedPolyline.replace('undefined', '');
    //   encodedPolyline = encodedPolyline.slice(0, -1);
    //
    //   fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=${encodedPolyline}&key=AIzaSyC3jMg6VnMXetDJ2eI4a2A-uSZTlT4r4z4`)
    //     .then((resp) => resp.json())
    //     .then(data => {
    //
    //       // convert to geojson: https://google-developers.appspot.com/maps/documentation/utils/geojson/
    //       //long-lat-elevation
    //
    //       const geojson = [{
    //
    //         "type": "FeatureCollection",
    //         "features": [
    //           {
    //             "type": "Feature",
    //             "geometry": {
    //               "type": "LineString",
    //               "coordinates":
    //                 data.results.map(c => ([c.location.lng, c.location.lat, c.elevation]))
    //             },
    //             "properties": {}
    //           }
    //         ],
    //         "properties": {
    //           "Creator": "Andras Dako",
    //           "records": 0,
    //           "summary": "null"
    //         }
    //       }];
    //
    //       renderElevationGraph(geojson);
    //     });
    // }


  /**
   * leaflet graph for elevation
   */
    // https://github.com/GIScience/Leaflet.Heightgraph
  // const hg = L.control.heightgraph();
  // hg.addTo(myMap);
  // hg.addData(geoJSON);
  // L.geoJson(geoJSON).addTo(myMap);

  return (
    <div>
      <IconButton>
        <ArrowBackIosIcon size={'large'} onClick={hideDetail}>
        </ArrowBackIosIcon>
      </IconButton>

      <ElevationChart/>

      {segmentDetails ?
        (
          <div>
            <p>{segmentDetails.name}</p>
            <p>{segmentDetails.distance} m</p>
            <p>{segmentDetails.average_grade} %</p>
            <p>{segmentDetails.athlete_count} runners completed.</p>
            <p>{segmentDetails.effort_count} times completed.</p>
            <p>Lowest elevation: {segmentDetails.elevation_low}</p>
            <p>Highest elevation: {segmentDetails.elevation_high}</p>
            <p>{segmentDetails.total_elevation_gain} elevation gain.</p>
          </div>) : null}

      {segmentDetails && segmentDetails.athlete_segment_stats ?

        (
          <div>
            <p>Your
              time: {segmentDetails.athlete_segment_stats.pr_elapsed_time ?
                moment()
                  .startOf('day')
                  .seconds(segmentDetails.athlete_segment_stats.pr_elapsed_time)
                  .format('H:mm:ss') : 'not attempted.'} </p>
            <p>{segmentDetails.athlete_segment_stats.average_pace ?
              moment()
                .startOf('day')
                .seconds(segmentDetails.athlete_segment_stats.average_pace)
                .format('mm:ss') + ' min/km' : 'not attempted.'} </p>
            <p>You've
              had {segmentDetails.athlete_segment_stats.effort_count ? segmentDetails.athlete_segment_stats.effort_count : 0} attempts.</p>
          </div>) : null}
      //render polyline on graph
    </div>
  )
}