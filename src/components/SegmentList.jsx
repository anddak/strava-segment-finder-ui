import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import UniqueSegment from "./UniqueSegment";


export default function SegmentList({segmentList, showDetail}) {

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Distance</TableCell>
            <TableCell align="center">Elevation difference</TableCell>
            {/*<TableCell align="center">Best time</TableCell> /!*leaderboard - only top 200*!/*/}
          </TableRow>
        </TableHead>
        <TableBody>

          {segmentList ? segmentList.map(s =>
              <UniqueSegment
                name={s.name}
                distance={s.distance}
                elevationDifference={s.elev_difference}
                id={s.id}
                showDetail={showDetail}
              />
            )
            : <p>Nothing to display</p>}

        </TableBody>
      </Table>
    </div>
  )
}