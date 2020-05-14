import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useBleManager } from './hooks';

const BleModal = (props) => {
  const [manager, devices, scan, connect, isScanning] = useBleManager();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      manager.onStateChange((state) => state === 'PoweredOn' && scan(15000));
    } else {
      scan(15000);
    }
  }, [props.isVisible]);

  const deviceList = useMemo(() => (
    Object.values(devices).sort((a, b) => b.discovered - a.discovered)
  ), [devices]);

  const onConnect = async (device) => {
    const characteristics = await connect(device.id);
    await props.onConnect(characteristics);
    props.hide()
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.hide}
      onBackButtonPress={props.hide}
    >
      <View style={{ flex: 1, marginVertical: 80, marginHorizontal: 20, backgroundColor: 'white', borderRadius: 10 }}>
        <View style={styles.deviceItem}>
          <Text style={{ fontSize: 16 }}>Available Devices:</Text>
        </View>
        {deviceList.map((device, index) => (
          <TouchableOpacity key={device.id} style={[styles.deviceItem, { borderTopWidth: index === 0 ? 1 : 0 }]} onPress={() => onConnect(device)}>
            <Text>{device.localName}</Text>
          </TouchableOpacity>
        ))}
        {!isScanning && deviceList.length === 0 && (
          <View style={styles.deviceItem}>
            <Text>No devices found.</Text>
          </View>
        )}
        {isScanning && (
          <View style={styles.deviceItem}>
            <Text>Scanning...</Text>
          </View>
        )}
        
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  deviceItem: {
    display: 'flex',
    alignSelf: 'stretch',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default BleModal;
