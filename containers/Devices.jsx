import React, { useState, useEffect } from "react";
import Device from "../components/Device.jsx";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const deviceList = [];

  // fetch device data on component mount
  useEffect(() => {
    fetch('https://canary-homework-test.herokuapp.com/devices', {
      method: 'GET',
      headers: {
        'Content-type': 'Application/JSON'
      },
    })
    .then(res => res.json())
    .then(deviceRes => {
      // build array of Device components for rendering
      for(let i = 0; i < deviceRes.length; i += 1) {
        deviceList.push(<Device deviceName={deviceRes[i].name} deviceId={deviceRes[i].id} key={i} />)
      }
      // update devices array to re-render component once fetch chain resolves
      setDevices(deviceList);
    })
  }, []);

  return (
    <div className="devicesWrapper">
      <div className="devicesColumn">
        <div className="deviceTitle">Devices</div>
          {devices}
      </div>
    </div>
  );
}
