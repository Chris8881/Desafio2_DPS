import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { actualizarActividadPorUsuario } from '../Utilidades/Almacenamiento';

const PantallaEditarActividad = ({ route, navigation }) => {
  const { actividad, usuario } = route.params; // Obtén la actividad y el usuario desde los parámetros

  const [nombre, setNombre] = useState(actividad.nombre);
  const [materia, setMateria] = useState(actividad.materia);
  const [fecha, setFecha] = useState(actividad.fecha);

  const guardarCambios = async () => {
    const actividadActualizada = {
      ...actividad,
      nombre,
      materia,
      fecha,
      nombreOriginal: actividad.nombre, // Mantén el nombre original para buscar la actividad
    };

    await actualizarActividadPorUsuario(usuario, actividadActualizada); // Actualiza la actividad
    navigation.goBack(); // Regresa a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Actividad</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la actividad"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
      />
      <TouchableOpacity style={styles.boton} onPress={guardarCambios}>
        <Text style={styles.botonTexto}>Guardar Cambios</Text>
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default PantallaEditarActividad;