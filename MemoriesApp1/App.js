import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraComponent from './src/components/CameraComponent';
import GalleryComponent from './src/components/GalleryComponent';
import PreviewComponent from './src/components/PreviewComponent';
import PreviewScreen from './src/screens/PreviewScreen'; // Corregido
import React from 'react'; // <- Import corregido
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
            } else if (route.name === 'Gallery') {
              iconName = 'photo-library';
            } else if (route.name === 'Preview') {
              iconName = 'visibility';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Camera"
          component={CameraComponent}
          options={{ tabBarLabel: 'Camera' }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryComponent}
          options={{ tabBarLabel: 'Gallery' }}
        />
        <Tab.Screen
          name="Preview"
          component={PreviewComponent} // <- Aquí también se cambió
          options={{ tabBarLabel: 'Preview' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
