import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { base64Bytes, accelData } from './util';
import { useZScorePeakSignal } from './hooks';

import MultilineChart from './MultilineChart';
import DownloadButton from './DownloadButton';
import BleModal from './BleModal';

const { height, width } = Dimensions.get('window');

const HomeScreen = (props) => {
  const { navigation } = props;

  const [data, addPoint, setData] = useZScorePeakSignal(x => x.z, 40, 2.5, 0.1);
  const [stopped, setStopped] = useState(false);
  const [showDev, setShowDev] = useState(false);
  const [showBle, setShowBle] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={() => setShowDev(!showDev)} title={showDev ? "Hide Dev" : "Dev"} />
        </View>
      ),
      headerRight: () => (
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={() => setShowBle(true)} title="BT" />
        </View>
      ),
    });
  }, [navigation, setShowBle, showDev, setShowDev]);

  const readData = (characteristics) => {
    characteristics.find(c => c.isNotifiable).monitor((error, characteristic) => {
      if (!error) {
        const bytes = base64Bytes(characteristic.value);
        const newPoint = accelData(bytes);
        setStopped(stopped => {
          if (!stopped) {
            addPoint(newPoint);
          }
          return stopped;
        })
      }
    });
  }

  const displayData = useMemo(() => {
    if (data.length < 1) return data;
    const lastTime = data[data.length - 1].time;
    const lowerLimit = lastTime - 10 * 1000;
    return data.filter(x => x.time > lowerLimit);
  }, [data])

  const counter = useMemo(() => (
    data.reduce((acc, x, i, arr) => {
      if (i > 0 && arr[i - 1].signal < 1 && x.signal === 1) return acc + 1;
      return acc;
    }, 0)
  ), [data])

  const stop = () => setStopped(!stopped);
  const reset = () => setData([]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <BleModal
              isVisible={showBle}
              hide={() => setShowBle(false)}
              onConnect={readData}
            />
            <View style={{ paddingTop: 70, paddingBottom: 60, alignItems: 'center' }}>
              <AnimatedCircularProgress
                size={200}
                width={8}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                fill={counter}
              >
                {(fill) => <Text style={{ fontSize: 34 }}>{counter}</Text>}
              </AnimatedCircularProgress>
            </View>
            <View style={{ marginHorizontal: 70 }}>
              <Button onPress={reset} title="Clear" disabled={data.length === 0} />
            </View>
            {showDev && (
              <>
              <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <MultilineChart
                  data={displayData}
                  xKey={'time'}
                  style={{ flex: 1 }}
                  gridMin={0}
                  contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  dataKeys={['z', 'signal']}
                  colors={["red", "blue"]}
                />
              </View>
                <View style={{ marginHorizontal: 70, marginVertical: 5 }}>
                <Button onPress={stop} title="Stop" color="red" title={stopped ? 'Start' : 'Stop'} />
              </View>
              <DownloadButton
                style={{ marginHorizontal: 70, marginVertical: 5 }}
                data={data}
                text="Export"
                name="data"
              />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    height,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
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

export default HomeScreen;
