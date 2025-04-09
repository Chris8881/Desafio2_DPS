import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CameraComponent } from './components/CameraComponent';
import { AudioRecorder } from './components/AudioRecorder';
import { GalleryScreen } from './components/GalleryScreen'; // 👈 Agregado
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Camera') {
              iconName = 'camera';
            } else if (route.name === 'Audio Recorder') {
              iconName = 'mic';
            } else if (route.name === 'Galería') {
              iconName = 'photo-library'; // 👈 Icono para galería
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Camera"
          component={CameraComponent}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'blue' }, // Cambia el color de fondo aquí
          }}
        />
        <Tab.Screen
          name="Audio Recorder"
          component={AudioRecorder}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#000' }, // Cambia el color de fondo aquí
          }}
        />
        <Tab.Screen
          name="Galería"
          component={GalleryScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' }, // Fondo blanco para galería
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
