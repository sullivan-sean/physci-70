import React, { useState, useMemo } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { isPeak } from './util';

const useBleManager = () => {
  const manager = useMemo(() => new BleManager(), []);
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState({});

  const scan = (time) => {
    console.log("scanning for n seconds: ", time);
    setDevices({});
    manager.startDeviceScan(null, null, async (error, device) => {
      setScanning(true);
      if (error) {
        console.log("error: ", error);
      } else if (device.localName) {
        setDevices(devices => (device.id in devices ? devices : {
          ...devices,
          [device.id]: {
            id: device.id,
            localName: device.localName,
            isConnectable: device.isConnectable,
            name: device.name,
            rssi: device.rssi,
            discovered: new Date(),
          },
        }));
      }
    });
    setTimeout(() => {
      setScanning(false);
      manager.stopDeviceScan();
    }, time);
  };

  const connect = async (deviceId) => {
    const device = await manager.connectToDevice(deviceId);
    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    const charProm = services.map((service, i) => device.characteristicsForService(service.uuid));
    const characteristics = await Promise.all(charProm);
    return characteristics.flat();
  }

  return [manager, devices, scan, connect, scanning];
}

const useZScorePeakSignal = (getValue, lag, threshold, influence) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const addPoint = (newPoint) => setFilteredData(filteredData => {
    const value = getValue(newPoint);
    let newFiltered = value;
    let peak = 0;

    if (filteredData.length > lag) {
      peak = isPeak(filteredData.slice(filteredData.length - lag), value, threshold);

      if (peak !== 0) {
        newFiltered = (1 - influence) * filteredData[filteredData.length - 1] + influence * value;
      }
    }

    setData(data => [...data, { ...newPoint, signal: peak }])
    return [...filteredData, newFiltered];
  });

  return [data, addPoint, setData];
}

export { useBleManager, useZScorePeakSignal };
