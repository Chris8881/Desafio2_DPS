import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { obtenerCuentas, guardarSesionUsuario } from '../Utilidades/Almacenamiento'; // Funciones de almacenamiento

const PantallaLogin = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const iniciarSesion = async () => {
    if (usuario.trim() === '' || contraseña.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
  
    try {
      const cuentasGuardadas = await obtenerCuentas(); // Obtén todas las cuentas
      const cuentaEncontrada = cuentasGuardadas.find(
        (cuenta) => cuenta.usuario === usuario && cuenta.contraseña === contraseña
      );
  
      if (cuentaEncontrada) {
        await guardarSesionUsuario(usuario); // Guarda la sesión del usuario
        Alert.alert('Inicio de sesión exitoso', 'Bienvenido');
        navigation.navigate('PantallaInicio', { usuario }); // Pasa el usuario a la pantalla de inicio
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
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
      <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
        <Text style={styles.botonTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonRegistro}
        onPress={() => navigation.navigate('PantallaRegistro')} // Redirige a la pantalla de registro
      >
        <Text style={styles.botonTexto}>¿No tienes cuenta? Regístrate</Text>
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
    color: '#black',
    fontSize: 18,
  },
  botonRegistro: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
});

export default PantallaLogin;