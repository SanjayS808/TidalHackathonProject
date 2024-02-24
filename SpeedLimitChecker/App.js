import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function SpeedLimitApp() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [speedLimit, setSpeedLimit] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, distanceInterval: 1 }, (location) => {
        setLocation(location);
        fetchSpeedLimit(location.coords.latitude, location.coords.longitude);
      });
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
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        </MapView>
      )}
      {speedLimit && (
        <View style={styles.speedLimitContainer}>
          <Text style={styles.speedLimitText}>Speed Limit: {speedLimit} mph</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  speedLimitContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  speedLimitText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
