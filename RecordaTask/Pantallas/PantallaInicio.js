import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { obtenerActividadesPorUsuario, eliminarActividadPorUsuario } from '../Utilidades/Almacenamiento';
import { useFocusEffect } from '@react-navigation/native';

const PantallaInicio = ({ route, navigation }) => {
  const { usuario } = route.params; // Obtén el usuario desde los parámetros de navegación
  const [actividades, setActividades] = useState([]);

  const cargarActividades = async () => {
    const actividadesGuardadas = await obtenerActividadesPorUsuario(usuario);
    setActividades(actividadesGuardadas);
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      cargarActividades();
    }, [])
  );

  const eliminarActividadHandler = (actividad) => {
    Alert.alert(
      'Eliminar Actividad',
      `¿Seguro que deseas eliminar la actividad: ${actividad.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            await eliminarActividadPorUsuario(usuario, actividad.nombre);
            cargarActividades();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const obtenerColorActividad = (fechaEntrega) => {
    const hoy = new Date();
    const fecha = new Date(fechaEntrega);

    if (fecha.toDateString() === hoy.toDateString()) {
      return '#4CAF50'; // Verde: Entrega hoy
    } else if (fecha < hoy) {
      return '#FF0000'; // Rojo: Fecha de entrega pasada
    } else {
      return '#2196F3'; // Azul: Fecha futura
    }
  };

  const renderActividad = ({ item }) => {
    const colorFondo = obtenerColorActividad(item.fecha);

    return (
      <View style={[styles.actividad, { backgroundColor: colorFondo }]}>
        <Text style={styles.textoActividad}>{item.nombre}</Text>
        <Text>{item.materia}</Text>
        <Text>{item.fecha}</Text>
        <View style={styles.botonesContainer}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('PantallaEditarActividad', { actividad: item, usuario })}
          >
            <Text style={styles.botonTexto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => eliminarActividadHandler(item)}
          >
            <Text style={styles.botonTexto}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={actividades}
        renderItem={renderActividad}
        keyExtractor={(item, index) => item.nombre + index}
        ListEmptyComponent={
          <Text style={styles.mensajeVacio}>No tienes actividades registradas.</Text>
        }
      />
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('PantallaAgregarActividad', { usuario })}
      >
        <Text style={styles.botonTexto}>Agregar Actividad</Text>
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
  actividad: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textoActividad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Asegúrate de que el texto sea visible sobre el fondo
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '45%',
  },
  botonTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
  botonAgregar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  mensajeVacio: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});

export default PantallaInicio;