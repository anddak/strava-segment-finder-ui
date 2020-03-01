import React, {useState} from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

export default function UserTimeForm() {

  const [distance, setDistance] = useState(0);

  //TODO: render this dinamically

  return(
    <div>
      <div>
      <Select
        id="user-effort-distance"
        defaultValue={1}
        onChange={event => setDistance(event.target.value)}
        value={distance}
        >
        <MenuItem value={1}>
          1 km
        </MenuItem>
        <MenuItem value={5}>
          5 km
        </MenuItem>
        <MenuItem value={10}>
          10 km
        </MenuItem>
        <MenuItem value={21}>
          Half-Marathon
        </MenuItem>
        <MenuItem value={42}>
          Marathon
        </MenuItem>
      </Select>
      </div>
      <div>

      </div>
    </div>
  )
}