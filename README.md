# PeakSpotApp 🏃‍♂️⚡

PeakSpotApp is a premium, performance-oriented React Native mobile application built on the Expo framework. Designed for athletic performance analysis and coaching, it integrates state-of-the-art diagnostics and seamless sensor communication for track-side speed, split, and acceleration metrics tracking.

---

## 🚀 Technology Stack & Dependencies

### Core Dependencies
- **expo** (`~54.0.35`) - App framework and runtime environment
- **react** (`^19.1.0`) & **react-native** (`0.81.5`) - Core UI execution engines
- **@react-navigation/native**, **@react-navigation/bottom-tabs**, & **@react-navigation/native-stack** - Application routing and tab navigation
- **react-native-safe-area-context** (`~5.6.0`) - Cross-platform safe area layouts
- **react-native-screens** (`~4.16.0`) - Native rendering performance enhancements for navigation
- **react-native-svg** (`15.12.1`) - Scalable vector graphics and icon systems
- **zustand** (`^5.0.14`) - Light and fast state management store
- **expo-camera** (`~17.0.10`) - Camera system integration for scanning athlete QR codes
- **expo-font** (`~14.0.12`) - Custom typography loading utility
- **expo-linear-gradient** (`~15.0.8`) - Gradient graphics and overlays
- **axios** (`^1.18.0`) - HTTP request handling for API layers

### Development Dependencies
- **typescript** (`~5.9.2`) - Strong type checking and static analysis
- **@types/react** (`~19.1.10`) - React type definitions

---

## 🛠️ Project Architecture

```
PeakSpotApp/
├── assets/                  # App icon, adaptive launcher assets & images
├── src/
│   ├── api/                 # API service layers
│   ├── components/          # Reusable UI component library
│   ├── constants/           # Core design tokens (theme.ts: colors, typography, spacing, shadows)
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation types & routes configuration
│   ├── screens/             # Screen components (Coach dashboard, Athlete profiling, Tests, etc.)
│   ├── store/               # Zustand state stores
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper utilities & mathematical formulas
├── App.tsx                  # Root navigation & application router
├── app.json                 # Expo configurations
├── index.ts                 # Main Expo entry point
├── package.json             # Node dependencies and build scripts
└── tsconfig.json            # TypeScript configuration
```

---

## 🖥️ Screen Directory

The app features 8 core screens representing the primary coaching workflows:

1. **`CoachDashboard.tsx`**: The main entry point for coaches containing athlete counts, device statuses, and quick action cards.
2. **`AthleteRegistration.tsx`**: Enrollment portal to register new athletes, auto-generating profiles, and custom system IDs.
3. **`QRCodePreview.tsx`**: Generates and displays an athlete's physical identifier QR badge to allow quick Scanning & Pairing.
4. **`AthleteProfile.tsx`**: Highlights individual demographics, physical attributes, historical results, and performance splits.
5. **`SelectTestProtocol.tsx`**: Menu displaying different test protocols (Sprint, Shuttle, Agility, Endurance) to load configurations.
6. **`ConfigureSprintTest.tsx`**: Dynamic portal to specify split gates, distances, countdown behaviors, auto-save settings, and verify device connections.
7. **`TestResults.tsx`**: Rich post-run summary screen visualizing sprint curves (SVG charts), split details, accelerations, and export triggers.
8. **`Settings.tsx`**: Preferences panel managing accounts, athlete default parameters, sensor calibration, notifications, and app theme configuration.

---

## 🧭 Navigation Model

The application implements a combined navigation structure:
- **Root Stack Navigator** handles full-screen modals, onboarding, and detail screens (`AthleteRegistration`, `QRCodePreview`, `ConfigureSprintTest`).
- **MainTabs Navigator** provides persistent tab selection at the bottom for easy navigation between main views (`Dashboard`, `Scan QR`, `Athletes` [AthleteProfile], `Tests` [SelectTestProtocol], `Reports` [TestResults], `Settings`).

---

## 📦 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or above recommended)
- npm or yarn
- Expo Go app on your [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) physical device (for local development)

### 📥 Installation

1. Navigate to the project root:
   ```bash
   cd PeakSpotApp
   ```

2. Install the package dependencies:
   ```bash
   npm install
   ```

### 🚀 Running the App

Start the Expo bundler:
```bash
npm run start
```

This will run the Metro Bundler on `http://localhost:8081`. You can then:
- Scan the QR code displayed in your terminal using **Expo Go** on Android or your camera app on iOS.
- Press `a` in the terminal to launch the app on an Android emulator.
- Press `i` to launch it on the iOS simulator.
- Press `w` to run the web view.

---

## 🛡️ Code Quality & Verification

We use strict TypeScript validation to ensure runtime stability. To verify the codebase for compile-time errors:
```bash
npx tsc --noEmit
```
