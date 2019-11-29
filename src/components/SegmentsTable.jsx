import React, {useState, useEffect} from 'react';
import L from "leaflet";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import {Button} from '@material-ui/core';
import {renderElevationGraph, segments} from "./MapUtils";
import Segment from './Segment';
import DetailedSegment from "./DetailedSegment";
import {removeElevationGraph} from "./MapUtils";
import {myMap} from "./MapBuilder";


export default class SegmentsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      segments: '',
      showDetail: false,
      segmentDetails: null
    };
    this.showDetail = this.showDetail.bind(this);
  }



  handleSegmentFetch = () => {
    this.setState({segments: segments})
  };

  showDetail = detail => {

    /**
     *  decode polyline (because google's elevation API doesn't want to take the decoded polyline)
     */
    let polyline;
    if (detail && detail.map) {
      const encoded = detail.map.polyline;
      polyline = L.Polyline.fromEncoded(encoded);

      /**
       * terrible hack to create the right url format for google's elevation API because of the above reason
       */
      let encodedPolyline;
      polyline.getLatLngs().map(s => encodedPolyline += `${s.lat},${s.lng}|`);
      encodedPolyline = encodedPolyline.replace('undefined', '');
      encodedPolyline = encodedPolyline.slice(0, -1);

      fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=${encodedPolyline}&key=AIzaSyC3jMg6VnMXetDJ2eI4a2A-uSZTlT4r4z4`)
        .then((resp) => resp.json())
        .then(data => {

          // convert to geojson: https://google-developers.appspot.com/maps/documentation/utils/geojson/
          //long-lat-elevation

          const geojson = [{

            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "LineString",
                  "coordinates":
                    data.results.map(c => ([c.location.lng, c.location.lat, c.elevation]))
                },
                "properties": {}
              }
            ],
            "properties": {
              "Creator": "Andras Dako",
              "records": 0,
              "summary": "null"
            }
          }];
          console.log('fetched');
          renderElevationGraph(geojson);
        });
    }

    this.setState({showDetail: true});
    this.setState({segmentDetails: detail});
  };

  hideDetail = () => {
    removeElevationGraph();
    this.setState({showDetail: false});
  };

  render() {
    const {segments, showDetail, segmentDetails} = this.state;
    return (
      <div>
        <Button onClick={this.handleSegmentFetch}>Fetch segments
        </Button>

        {showDetail ?

          (<DetailedSegment showDetail={showDetail} segmentDetails={segmentDetails} hideDetail={this.hideDetail}/>)
          :
          (<Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Distance</TableCell>
                <TableCell align="center">Elevation difference</TableCell>
                {/*<TableCell align="center">Best time</TableCell> /!*leaderboard - only top 200*!/*/}
              </TableRow>
            </TableHead>
            <TableBody>

              {segments ? segments.map(s =>
                  <Segment
                    name={s.name}
                    distance={s.distance}
                    elevationDifference={s.elev_difference}
                    id={s.id}
                    showDetail={this.showDetail}
                  />
                )
                : <p>Nothing to display</p>}

            </TableBody>
          </Table>)}
      </div>
    );
  }
}