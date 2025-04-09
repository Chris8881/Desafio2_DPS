import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FormularioUsuario from '../Componentes/FormularioUsuario';
import { guardarSesionUsuario, obtenerCuentas } from '../Utilidades/Almacenamiento';

const PantallaLogin = ({ navigation }) => {
  const manejarLogin = async ({ usuario, contraseña }) => {
    const cuentas = await obtenerCuentas();
    const cuentaValida = cuentas.find(
      (cuenta) => cuenta.usuario === usuario && cuenta.contraseña === contraseña
    );

    if (cuentaValida) {
      await guardarSesionUsuario(usuario);
      navigation.navigate('PantallaInicio', { usuario });
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <FormularioUsuario
        titulo="Iniciar Sesión"
        onSubmit={manejarLogin}
        valoresIniciales={{ usuario: '', contraseña: '' }}
        botonTexto="Iniciar Sesión"
      />
      <TouchableOpacity
        style={styles.botonRegistro}
        onPress={() => navigation.navigate('PantallaRegistro')}
      >
        <Text style={styles.textoRegistro}>¿No tienes cuenta? Regístrate aquí</Text>
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
  botonRegistro: {
    marginTop: 20,
    alignItems: 'center',
  },
  textoRegistro: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default PantallaLogin;