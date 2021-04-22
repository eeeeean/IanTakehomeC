import React from "react";
import { Link } from "react-router-dom";

export default function Device({ deviceName, deviceId }) {
  // Device components route to Details page via react router Link component
  // state property on Link component to store device id & name for use in Graphs container
  return (
    <Link to={{pathname:`/details/${deviceName}`, state:{id: deviceId, name: deviceName}}}>
      <div className="device">
        <div className="deviceName">{deviceName}</div>
        <span className="greyLink">Details</span>
      </div>
    </Link>
  );
}
