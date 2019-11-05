import L from 'leaflet';
import {renderSegmentPolylines} from './MapUtils';
import 'polyline-encoded';

/**
 *
 * @param SWBounds southwest corner latitutde, southwest corner longitude from map selection
 * @param NEBounds northeast corner latitude, northeast corner longitude from map selection
 */
export function getSegments(SWBounds, NEBounds) {

  const bounds = `${SWBounds.lat},${SWBounds.lng},${NEBounds.lat},${NEBounds.lng}`;

  fetch(`http://localhost:8081/api/v1/segments?bounds=${bounds}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((resp) => resp.json())
    .then(data =>  {
    console.log(JSON.stringify(data));
    renderSegmentPolylines(data)
  })
}


  //TODO: next steps: add marker at start of segments
  //TODO: add location searchbar
  //TODO: remove polygon, (add circle?)


//TODO: extract URL's
//TODO: handle/catch impl (if 204 then no results found, but this should also return a body text from the backend otherwise fetch will complain