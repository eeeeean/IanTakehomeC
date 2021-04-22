import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Graph from "../components/Graph.jsx";

export default function Graphs() {
  const { state } = useLocation();
  const [graphs, setGraphs ] = useState([]);
  const graphsList = [];

  // fetch readings data on component mount using id passed via router useLocation hook
  useEffect(() => {
    fetch(`https://canary-homework-test.herokuapp.com/devices/${state.id}/readings`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/JSON'
      },
    })
    .then(res => res.json())
    .then(deviceReadings => {
      // build Graph component list by separating readings data by type
      for(let i = 0; i < deviceReadings.length; i += 1) {
        const curData = [];
        const curReading = deviceReadings[i].type;
    
        while(curReading === deviceReadings[i].type) {
          curData.push(deviceReadings[i]);
          if(!deviceReadings[i + 1] || curReading !== deviceReadings[i + 1].type) break;
          i += 1;
        }
        graphsList.push(<Graph data={curData} reading={deviceReadings[i].type} key={i} />)
      }
      // update graphs array to re-render component once fetch chain resolves
      setGraphs(graphsList);
    })
  }, []);

  return (
    <div className="graphsWrapper">
      <div className="greyLink"><Link to="/" >&lt;&lt; Devices</Link></div>
      <div className="graphsColumn">
        <div className="deviceTitle">{state.name}</div>
        {graphs}
      </div>
    </div>
  );
}
