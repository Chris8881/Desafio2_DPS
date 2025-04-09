import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { obtenerCuentas, guardarCuenta } from '../Utilidades/Almacenamiento';
import { useNavigation } from '@react-navigation/native';

const PantallaRegistro = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const registrarCuenta = async () => {
    if (usuario.trim() === '' || contraseña.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
  
    try {
      const cuentasGuardadas = await obtenerCuentas(); // Obtén todas las cuentas
      const cuentaExistente = cuentasGuardadas.find((cuenta) => cuenta.usuario === usuario);
  
      if (cuentaExistente) {
        Alert.alert('Error', 'El usuario ya existe');
      } else {
        const nuevaCuenta = { usuario, contraseña };
        await guardarCuenta(nuevaCuenta); // Guarda la nueva cuenta
        Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
        navigation.goBack(); // Regresa a la pantalla de inicio de sesión
      }
    } catch (error) {
      console.error('Error al registrar la cuenta:', error);
      Alert.alert('Error', 'No se pudo registrar la cuenta');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
      />
      <TouchableOpacity style={styles.boton} onPress={registrarCuenta}>
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PantallaRegistro;
