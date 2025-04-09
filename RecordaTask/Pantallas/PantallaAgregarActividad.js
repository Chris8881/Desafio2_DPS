import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { guardarActividadPorUsuario } from '../Utilidades/Almacenamiento';

const PantallaAgregarActividad = ({ route, navigation }) => {
  const { usuario } = route.params; // Obtén el usuario desde los parámetros

  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');

  const agregarActividad = async () => {
    if (nombre && materia && fecha) {
      const fechaValida = !isNaN(Date.parse(fecha));
      if (!fechaValida) {
        alert('Por favor, ingrese una fecha válida (YYYY-MM-DD).');
        return;
      }
  
      const nuevaActividad = { nombre, materia, fecha };
      await guardarActividadPorUsuario(usuario, nuevaActividad);
      navigation.goBack();
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nombre de la Actividad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la actividad"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.texto}>Materia:</Text>
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <Text style={styles.texto}>Fecha de Entrega:</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TouchableOpacity style={styles.boton} onPress={agregarActividad}>
        <Text style={styles.botonTexto}>Guardar Actividad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  texto: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PantallaAgregarActividad;