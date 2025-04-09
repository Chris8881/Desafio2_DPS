import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import MapView, { Marker } from 'react-native-maps';

export default function GalleryScreen() {
  const [photos, setPhotos] = useState([]);

  // Función para cargar las fotos guardadas desde el archivo
  const loadSavedPhotos = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'savedPhotos.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (fileExists.exists) {
        const savedData = await FileSystem.readAsStringAsync(fileUri);
        const photosList = JSON.parse(savedData);
        setPhotos([photosList]);  // En este caso solo hay un archivo guardado, si quieres guardar más datos, deberías manejar un array.
      }
    } catch (error) {
      console.log('Error al cargar las fotos guardadas', error);
    }
  };

  // Cargar las fotos guardadas al inicio
  useEffect(() => {
    loadSavedPhotos();
  }, []);

  // Función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.annotationText}>{item.annotation}</Text>
      <Text style={styles.locationText}>
        Ubicación: {item.location ? `${item.location.latitude}, ${item.location.longitude}` : 'Sin ubicación'}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }} />
      </MapView>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Volver a la Cámara" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  annotationText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  locationText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
