import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let database;

export function init() {
  return new Promise(async (resolve, reject) => {
    try {
      if (!database) {
        database = await SQLite.openDatabaseAsync("places.db");
      }

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );
      `);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("places.db");
  }
  return database;
}

export async function insertPlace(place) {
  const db = await getDatabase();

  // expo-sqlite (SDK 54) uses async helpers like runAsync/execAsync.
  // Use runAsync for INSERT/UPDATE/DELETE with bound parameters.
  return db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  );
}

export async function fetchPlaces() {
  const db = await getDatabase();
  const rows = await db.getAllAsync("SELECT * FROM places");

  return rows.map(
    (row) =>
      new Place(
        row.title,
        row.imageUri,
        { address: row.address, lat: row.lat, lng: row.lng },
        row.id?.toString?.() ?? `${row.id}`,
      ),
  );
}

export async function fetchPlaceById(id) {
  const db = await getDatabase();
  const row = await db.getFirstAsync("SELECT * FROM places WHERE id = ?", [id]);

  if (!row) {
    return null;
  }

  return new Place(
    row.title,
    row.imageUri,
    { address: row.address, lat: row.lat, lng: row.lng },
    row.id?.toString?.() ?? `${row.id}`,
  );
}
