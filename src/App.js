import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapWrapper from "./components/MapWrapper";
import UserTimeForm from "./components/UserTimeForm";


function App() {
  return (
    <div className="App">
      {/*<UserTimeForm/>*/}
      <MapWrapper />
    </div>
  );
}

export default App;
