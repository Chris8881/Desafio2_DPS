import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const FormularioActividad = ({ onSubmit, actividadInicial = {} }) => {
  const [nombre, setNombre] = useState(actividadInicial.nombre || '');
  const [materia, setMateria] = useState(actividadInicial.materia || '');
  const [fecha, setFecha] = useState(actividadInicial.fecha || '');

  const manejarEnvio = () => {
    if (nombre && materia && fecha) {
      onSubmit({ nombre, materia, fecha });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  };

  return (
    <View>
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
      <TouchableOpacity style={styles.boton} onPress={manejarEnvio}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default FormularioActividad;