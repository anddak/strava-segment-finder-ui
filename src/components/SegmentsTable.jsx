import React, {useState, useEffect} from 'react';
import L from "leaflet";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import {Button} from '@material-ui/core';
import {segments} from "./MapUtils";
import Segment from './Segment';
import DetailedSegment from "./DetailedSegment";


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
    console.log(detail);
    this.setState({showDetail: true});
    this.setState({segmentDetails: detail});
  };

  hideDetail = () => {
    this.setState({showDetail: false});
  };

  render() {
    const {segments, showDetail, segmentDetails} = this.state;
    return (
      <div>
        <Button onClick={this.handleSegmentFetch}>Fetch segments
        </Button>

        {showDetail ?

          (<DetailedSegment segmentDetails={segmentDetails} hideDetail={this.hideDetail}/>)
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