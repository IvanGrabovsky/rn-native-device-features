import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchPlaceById } from "../util/database";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";

function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState(null);

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlace() {
      const place = await fetchPlaceById(selectedPlaceId);
      setPlace(place);
      navigation.setOptions({ title: place.title });
    }

    loadPlace();
  }, [selectedPlaceId, navigation]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading place…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.coords}>
          {place.location.lat.toFixed(6)}, {place.location.lng.toFixed(6)}
        </Text>
        <Button
          onPress={() =>
            navigation.navigate("Map", {
              initialLocation: place.location,
              readOnly: true,
            })
          }
        >
          View on Map
        </Button>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  info: {
    padding: 24,
    alignItems: "center",
  },
  address: {
    fontSize: 16,
    color: Colors.primary50,
    textAlign: "center",
  },
  coords: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.primary200,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: Colors.primary200,
  },
});
