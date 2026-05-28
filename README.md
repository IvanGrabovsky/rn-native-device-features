# rn-native-device-features

A React Native / Expo study project for exploring native device features such as camera, location, permissions, storage, notifications, and more.

## Tech Stack

- React Native
- Expo
- JavaScript

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npx expo start
```

## Run on device

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with Expo Go on your phone

## Project Goal

The goal of this project is to practice working with native mobile device APIs in React Native using Expo.

## Backend configuration

This app loads and saves expenses through a remote backend. Before running the app, open `util/auth.js` and set `API_KEY` to a **valid Firebase Realtime Database URL** for your project (see the comment in that file). Without a working URL, fetch, create, update, and delete requests will fail.

If you need help setting this up, contact the author at [ivan.grabovsky.ua@gmail.com](mailto:ivan.grabovsky.ua@gmail.com).