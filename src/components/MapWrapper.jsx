import React, {Component} from 'react';
import L from 'leaflet';
import './styles.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const ACCESS_TOKEN = 'pk.eyJ1IjoiYW5kZGFrIiwiYSI6ImNrMXBjYnpsNjBxZHozZHJ5NDlnbTc3N3EifQ.pxTKmJRYF4OqvUmIahDcdA';

class MapWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawType: '',
      drawDetails: {},
    }
  }


  componentDidMount() {

    /*
    Create map and set a default view
     */
    let myMap = L.map('leaflet-container').setView([51.505, -0.09], 13);

    /*
    Apply a layer (currently using Mapox streets)
     */
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: ACCESS_TOKEN
    }).addTo(myMap);

    /*
    edit toolbar for leaflet draw
     */

    const drawnItems = new L.FeatureGroup();
    myMap.addLayer(drawnItems);


    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    });
    myMap.addControl(drawControl);

    /*
    set default view as user location - this only works if location services is allowed -
     */
    myMap.locate({setView: true, maxZoom: 16})

    /*
    draw event
     */
    myMap.on(L.Draw.Event.CREATED, function (e) {
      let type = e.layerType,
        layer = e.layer;
      // Do whatever else you need to. (save to db; add to map etc)

      this.setState(
        {
          drawDetails: layer
        });

      myMap.addLayer(layer);
    }.bind(this));



  }

  render() {

    return (
      <div id="leaflet-container">
      </div>
    );
  }
}

export default MapWrapper;