import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

export default function PreviewComponent({ photo, location }) {
  const [annotation, setAnnotation] = useState('');
  const navigation = useNavigation();

  const savePhoto = async () => {
    const photoData = {
      uri: photo,
      annotation: annotation,
      location: location,
    };

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + 'savedPhotos.json',
      JSON.stringify(photoData)
    );

    navigation.navigate('Gallery');
  };

  const discardPhoto = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.imagePreview} />
      <TextInput
        style={styles.annotationInput}
        placeholder="Añadir anotación"
        value={annotation}
        onChangeText={setAnnotation}
      />
      <Button title="Guardar" onPress={savePhoto} />
      <Button title="Descartar" onPress={discardPhoto} />
      <Text>
        Ubicación: {location ? `${location.latitude}, ${location.longitude}` : 'Sin ubicación'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  annotationInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
