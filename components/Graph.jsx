import React from "react";
import { XAxis, YAxis, Tooltip, AreaChart, Area, Text } from 'recharts';

export default function Graph({ data, reading }) {
  const dateTimeFormat = {weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'};
  const dayFormat = {weekday: 'short'};
  const yUnit = {tempurature: '°', humidity: '%', air_quality: ''};
  let propReading;
  let minRange;
  let curDay;

  // clean reading type labels
  if (reading === 'tempurature') {
    propReading = "Temperature";
  } else {
    propReading = reading.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  // update data/time format and styling of hover-activated tooltip
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <div className="tooltipText">{new Date(label).toLocaleDateString('en-us', dateTimeFormat)}</div>
          <div className="tooltipText">{`${propReading}: ${payload[0].value}${yUnit[reading]}`}</div>
        </div>
      );
    }
    return null;
  }
  
  // group multiple date labels on x axis by shared weekday label
  function DailyTickFormatter({ x, y, payload, keySelect }) {
    if (curDay !== new Date(payload.value).toLocaleDateString()) {
      minRange = x;
    }
    curDay = new Date(payload.value).toLocaleDateString();
    const ticks = data.filter((tick) => new Date(tick.created).toLocaleDateString() === new Date(payload.value).toLocaleDateString());

    if (ticks[ticks.length - 1][keySelect] === payload.value) {
      let xOffset = ((x - minRange) / 2) + 60;
      if (ticks.length === 1) xOffset = x;
      return (
        <Text
          x={xOffset}
          y={y - 30}
          width={75}
          textAnchor="middle"
          verticalAnchor="start"
        >
          {new Date(payload.value).toLocaleDateString('en-us', dayFormat)}
        </Text>
      );
    }
    return null;
  }

  return (
    <div className="graph">
      <div className="readingTitle">{propReading}</div>
        <AreaChart width={900} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8"  />
          <XAxis dataKey="created" tickLine={false} tick={false} />
          <XAxis
            dataKey="created"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={<DailyTickFormatter keySelect="created" />}
            xAxisId="day"
          />
          <YAxis unit={yUnit[reading]} />
          <Tooltip content={<CustomTooltip />}/>
        </AreaChart>
    </div>
  );
}
