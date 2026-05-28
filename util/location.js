import { reverseGeocodeAsync } from "expo-location";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function getMapPreview(latitude, longitude) {
  if (!GOOGLE_API_KEY) {
    return null;
  }

  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(lat, lng) {
  const results = await reverseGeocodeAsync({
    latitude: lat,
    longitude: lng,
  });

  const address = results?.[0];
  return (
    address?.formattedAddress ??
    address?.name ??
    "Unknown address"
  );
}
