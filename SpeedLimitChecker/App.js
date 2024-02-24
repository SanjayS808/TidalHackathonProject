import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [speed, setSpeed] = useState(null);
  const [speedLimit, setSpeedLimit] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const fetchSpeedData = async () => {
        const location = await Location.getCurrentPositionAsync({});
        setSpeed(location.coords.speed * 2.23694); // Convert m/s to mph
        fetchSpeedLimit(location.coords.latitude, location.coords.longitude);
      };

      const intervalId = setInterval(fetchSpeedData, 1000);

      return () => clearInterval(intervalId);
    })();
  }, []);

  const fetchSpeedLimit = async (latitude, longitude) => {
    // Call your speed limit API here, passing latitude and longitude
    // For demonstration purposes, let's assume a static value for speed limit
    // Replace this with your actual API call
    const fakeSpeedLimit = 45;
    setSpeedLimit(fakeSpeedLimit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.speedText}>{speed !== null ? `${speed.toFixed(2)} mph` : 'Waiting for location...'}</Text>
      <Text style={styles.speedLimitText}>{speedLimit !== null ? `Speed Limit: ${speedLimit} mph` : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  speedLimitText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
