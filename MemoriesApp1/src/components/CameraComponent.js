import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';

const CameraComponent = ({ onPictureTaken }) => {
  const [facing, setFacing] = useState(CameraType.back);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);  // Usamos useRef para referenciar la cámara

  // Mientras los permisos de la cámara no se hayan concedido, no hacemos nada
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Necesita permiso para usar la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  // Función para alternar entre cámara frontal y trasera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  // Función para abrir la cámara
  const handleOpenCamera = () => {
    setIsCameraVisible(true);
  };

  // Función para cerrar la cámara
  const handleCloseCamera = () => {
    setIsCameraVisible(false);
  };

  // Función para tomar una foto
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPictureTaken(photo);
    }
  };

  // Mostrar cámara o botón para abrirla
  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <Camera style={styles.camera} type={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Voltear cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCloseCamera}>
              <Text style={styles.text}>Cerrar cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Tomar foto</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Button style={styles.buttonText} title="Abrir cámara" onPress={handleOpenCamera} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CameraComponent;
