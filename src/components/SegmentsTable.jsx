import React, {useState, useEffect} from 'react';
import L from "leaflet";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { segments} from "./MapUtils";


export default class SegmentsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {segments: ''};
  }

  handleSegmentFetch = () => {
    this.setState({segments: segments})
  };


  render() {
    const {segments} = this.state;
    return (
      <div>
        <Button onClick={this.handleSegmentFetch}/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Distance</TableCell>
              <TableCell align="center">Elevation difference</TableCell>
              {/*<TableCell align="center">Lowest point</TableCell> /!*segment*!/*/}
              {/*<TableCell align="center">Highest point</TableCell> /!*segment*!/*/}
              {/*<TableCell align="center">Total elevation</TableCell> /!*segment*!/*/}
              {/*<TableCell align="center">No. of athletes completed</TableCell> /!*segment*!/*/}
              {/*<TableCell align="center">No. of times was completed</TableCell> /!*segment*!/*/}
              {/*<TableCell align="center">Best time</TableCell> /!*leaderboard - only top 200*!/*/}
            </TableRow>
          </TableHead>
          <TableBody>

            { segments ? segments.map(s =>
              <TableRow key={s.name}>
              <TableCell component="th" scope="row" align="center">{s.name}</TableCell>
                <TableCell align="center">{s.distance} m</TableCell>
                <TableCell align="center">{s.elev_difference} m</TableCell>
              </TableRow>
            )
              : <p>Nothing to display</p> }

          </TableBody>
        </Table>
      </div>
    );
  }
}