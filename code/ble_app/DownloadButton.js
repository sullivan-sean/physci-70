import React, { useCallback } from 'react';
import { View, Button } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import csv from 'csv.js';

const DownloadButton = (props) => {
  const export_csv = useCallback(async () => {
    const encoded = csv.encode(props.data);
    let pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${props.name}.csv`;
    let exists = await RNFetchBlob.fs.exists(pathToWrite);
    let num = 1;
    while (exists) {
      num += 1;
      pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${props.name}_${num}.csv`;
      exists = await RNFetchBlob.fs.exists(pathToWrite);
    }
    await RNFetchBlob.fs.writeFile(pathToWrite, encoded, 'utf8')
  }, [props.data, props.name]);

  return (
    <View style={props.style}>
      <Button onPress={export_csv} title={props.text} />
    </View>
  )
}

export default DownloadButton;
