import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormularioActividad from '../Componentes/FormularioActividad';
import { actualizarActividadPorUsuario } from '../Utilidades/Almacenamiento';

const PantallaEditarActividad = ({ route, navigation }) => {
  const { actividad, usuario } = route.params;

  const editarActividad = async (actividadActualizada) => {
    await actualizarActividadPorUsuario(usuario, {
      ...actividadActualizada,
      nombreOriginal: actividad.nombre,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FormularioActividad onSubmit={editarActividad} actividadInicial={actividad} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
});

export default PantallaEditarActividad;