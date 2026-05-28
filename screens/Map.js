import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params?.initialLocation;
  const isReadOnly = route.params?.readOnly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = initialLocation
    ? {
        latitude: initialLocation.lat,
        longitude: initialLocation.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.07,
        longitudeDelta: 0.004,
      };

  function handleSelectLocation(event) {
    if (isReadOnly) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (isReadOnly) {
      return;
    }
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You must pick a location on the map first.",
      );

      return;
    }

    if (selectedLocation) {
      navigation.navigate("AddPlace", {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
      });
    }
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: isReadOnly
        ? undefined
        : (tintColor) => (
            <IconButton
              icon="save"
              color={tintColor}
              size={24}
              onPress={savePickedLocationHandler}
            />
          ),
    });
  }, [navigation, savePickedLocationHandler, isReadOnly]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title={isReadOnly ? "Saved Location" : "Picked Location"}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
