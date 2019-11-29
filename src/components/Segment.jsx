import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function Segment({name, distance, elevationDifference, id, showDetail}) {

  const handleClick = () => {

    fetch(`http://localhost:8081/api/v1/segment/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())
      .then(data =>  {
        showDetail(data);
      });

  };

  return (
    <React.Fragment>
      <TableRow key={id} hover={true} onClick={handleClick}>
        <TableCell component="th" scope="row" align="center">{name}</TableCell>
        <TableCell align="center">{distance} m</TableCell>
        <TableCell align="center">{elevationDifference} m</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

