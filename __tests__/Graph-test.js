import React from 'react';
import { render, getByText } from '@testing-library/react';
import Graph from '../components/Graph.jsx';

  const graphProps = {
    data: [
    {id: 34, created: "2021-03-25T14:08:46.084Z", value: "35.00", type: "humidity", deviceid: 1},
    {id: 35, created: "2021-03-25T14:08:52.825Z", value: "70.00", type: "humidity", deviceid: 1},
    {id: 36, created: "2021-03-25T14:08:58.410Z", value: "50.00", type: "humidity", deviceid: 1},
    {id: 37, created: "2021-03-25T14:09:01.734Z", value: "10.00", type: "humidity", deviceid: 1},
    {id: 38, created: "2021-03-25T14:09:05.214Z", value: "20.00", type: "humidity", deviceid: 1},
    {id: 39, created: "2021-03-25T14:31:33.668Z", value: "30.00", type: "humidity", deviceid: 1},
    {id: 40, created: "2021-03-25T14:31:37.345Z", value: "90.00", type: "humidity", deviceid: 1}  
  ],
  reading: 'humidity'
};

describe('Graph component tests', () => {
  it('Should render a Graph component', () => {
    const { container } = render(<Graph {...graphProps} />);
    expect(container.querySelector('.graph')).toBeTruthy();
  });

  it('Graph component should print proper case reading type', () => {
    const { container } = render(<Graph {...graphProps} />);
    expect(container.querySelector('.readingTitle').textContent).toEqual('Humidity');
  });

  it('Should render 1 graph', () => {
    const { container } = render(<Graph {...graphProps} />);
    expect(container.querySelectorAll('.graph').length).toEqual(1);
  });

  it('Should render % units for Humidity reading type', () => {
    const { container } = render(<Graph {...graphProps} />);
    expect(getByText(container, '100%')).toBeTruthy();
  });
});
