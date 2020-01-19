import React from 'react';
import L from "leaflet";
import {Button} from '@material-ui/core';
import {segments} from "../js/MapUtils";
import SegmentList from './SegmentList';
import DetailedSegment from "./DetailedSegment";
import {removeElevationGraph} from "../js/MapUtils";
import Paper from '@material-ui/core/Paper';
import {decodePolyline, generateEncodedPolylineParam} from "../js/MapUtils";
import {fetchElevation} from "../js/MapFetch";


export default class SegmentsWrapper extends React.Component {

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

    if (detail && detail.map) {
         fetchElevation(
          generateEncodedPolylineParam(
            decodePolyline(detail.map.polyline)));
      }

    this.setState({segmentDetails: detail});
    this.setState({showDetail: true});

  };

  hideDetail = () => {
    removeElevationGraph();
    this.setState({showDetail: false});
  };

  render() {
    const {segments, showDetail, segmentDetails} = this.state;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleSegmentFetch}>Fetch segments
        </Button>

        {showDetail ?

          (<DetailedSegment segmentDetails={segmentDetails} hideDetail={this.hideDetail}/>)
          :
          ( <Paper>
            <SegmentList segmentList={segments} showDetail={this.showDetail} />
          </Paper> )

        }
      </div>
    );
  }
}