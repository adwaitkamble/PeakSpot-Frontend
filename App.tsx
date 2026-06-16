import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from './src/constants/theme';

// Import screens
import CoachDashboard from './src/screens/CoachDashboard';
import AthleteRegistration from './src/screens/AthleteRegistration';
import QRCodePreview from './src/screens/QRCodePreview';
import AthleteProfile from './src/screens/AthleteProfile';
import SelectTestProtocol from './src/screens/SelectTestProtocol';
import ConfigureSprintTest from './src/screens/ConfigureSprintTest';
import SettingsScreen from './src/screens/Settings';



import Svg, { Path } from 'react-native-svg';
import TestResults from './src/screens/TestResults';

// Temporary Screen Component to hold space until we drop in the Locofy screens
const PlaceholderScreen = ({ route }: any) => (
  <View style={styles.center}>
    <Text style={styles.text}>{route.name} Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Header Styling
        headerStyle: {
          backgroundColor: COLORS.oxfordBlue[500],
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
        headerTintColor: COLORS.neutral.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: COLORS.oxfordBlue[50], // Match light background
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 12,
          paddingTop: 10,
        },
        // Bottom Tab Styling
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: COLORS.oxfordBlue[500] }} />
        ),
        tabBarActiveTintColor: COLORS.coralRed[500],
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ color }) => {
          const size = 20;
          if (route.name === 'Dashboard') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM19 3h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM19 13h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          } else if (route.name === 'Scan QR') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M5 8H7C7.551 8 8 7.551 8 7V5C8 4.448 7.551 4 7 4H5C4.448 4 4 4.448 4 5V7C4 7.551 4.448 8 5 8ZM17 8H19C19.551 8 20 7.551 20 7V5C20 4.448 19.551 4 19 4H17C16.448 4 16 4.448 16 5V7C16 7.551 16.448 8 17 8ZM5 20H7C7.551 20 8 19.551 8 19V17C8 16.448 7.551 16 7 16H5C4.448 16 4 16.448 4 17V19C4 19.551 4.448 20 5 20ZM4 12H8M12 4V5M12 9V12M12 12H12.01M12 12H16.01M16 20H20M12 16V20M20 12H20.01"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          } else if (route.name === 'Athletes') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          } else if (route.name === 'Tests') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M13 10V3L4 14H11V21L20 10H13Z"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          } else if (route.name === 'Reports') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 19V13C9 11.896 8.103 11 7 11H5C3.896 11 3 11.896 3 13V19C3 20.103 3.896 21 5 21H7C8.103 21 9 20.103 9 19ZM9 19V9C9 7.896 9.896 7 11 7H13C14.103 7 15 7.896 15 9V19M15 19V5C15 3.896 15.896 3 17 3H19C20.103 3 21 3.896 21 5V19C21 20.103 20.103 21 19 21H17C15.896 21 15 20.103 15 19ZM9 19C9 20.103 9.896 21 11 21H13C14.103 21 15 20.103 15 19"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          } else if (route.name === 'Settings') {
            return (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            );
          }
          return null;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={CoachDashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Scan QR" component={PlaceholderScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Athletes" component={AthleteProfile} options={{ headerShown: false }} />
      <Tab.Screen name="Tests" component={SelectTestProtocol} options={{ headerShown: false }} />
      <Tab.Screen name="Reports" component={TestResults} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.oxfordBlue[500]} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="QRCodePreview" component={QRCodePreview} />
          <Stack.Screen name="AthleteRegistration" component={AthleteRegistration} />
          <Stack.Screen name="ConfigureSprintTest" component={ConfigureSprintTest} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral.light,
  },
  text: {
    fontSize: 20,
    color: COLORS.oxfordBlue[500],
    fontWeight: 'bold',
  }
});