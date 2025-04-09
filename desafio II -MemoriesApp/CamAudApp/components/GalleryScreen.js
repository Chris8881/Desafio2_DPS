import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';

export const GalleryScreen = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const filePath = FileSystem.documentDirectory + 'photoData.json';
    try {
      const data = await FileSystem.readAsStringAsync(filePath);
      const parsedData = JSON.parse(data);
      setMedia(parsedData);
    } catch (error) {
      console.log("No se pudo cargar el archivo JSON o está vacío", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Galería de Medios</Text>
      <Button title="Actualizar" onPress={loadMedia} />
      <FlatList
        data={media}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.imageContainer}>
            {item.type === 'video' ? (
              <Video
                source={{ uri: item.uri }}
                style={styles.image}
                useNativeControls
                resizeMode="cover"
                isLooping
              />
            ) : (
              <Image source={{ uri: item.uri }} style={styles.image} />
            )}
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.location}>
              {item.location ? `Ubicación: ${item.location.latitude}, ${item.location.longitude}` : 'Ubicación no disponible'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  location: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: '#555',
  },
});
