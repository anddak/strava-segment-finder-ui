import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderBottom: "none"
  }
});

export default function UniqueSegment({name, distance, elevationDifference, id, showDetail}) {

  const classes = useStyles();

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
        <TableCell className={classes.root} component="th" scope="row" align="center">{name}</TableCell>
        <TableCell className={classes.root} align="center">{distance} m</TableCell>
        <TableCell className={classes.root} align="center">{elevationDifference} m</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

