import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Device from '../components/Device.jsx';

const deviceProps = { deviceName: 'Device 1', deviceId: 1 };

describe('Link component tests', () => {
  it('Should render a Link component', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('a')).toBeTruthy();
  });

  it('Link component should have an href attribute of "/details/Device 1"', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('a').getAttribute('href')).toEqual('/details/Device 1');
  });
});

describe('Device component tests', () => {
  it('Should render a device class element', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('.device')).toBeTruthy();
  });

  it('Should render a deviceName class element', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('.deviceName')).toBeTruthy();
  });

  it('Should render a greyLink class element', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('.greyLink')).toBeTruthy();
  });

  it('deviceName element should display device name', () => {
    const { container } = render(<Router><Device {...deviceProps} /></Router>);
    expect(container.querySelector('.deviceName').textContent).toEqual('Device 1');
  });
});