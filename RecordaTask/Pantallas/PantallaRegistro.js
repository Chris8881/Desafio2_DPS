import React from 'react';
import FormularioUsuario from '../Componentes/FormularioUsuario';
import { guardarCuenta } from '../Utilidades/Almacenamiento';

const PantallaRegistro = ({ navigation }) => {
  const manejarRegistro = async ({ usuario, contraseña }) => {
    const nuevaCuenta = { usuario, contraseña };
    await guardarCuenta(nuevaCuenta);
    alert('Cuenta registrada exitosamente.');
    navigation.navigate('PantallaLogin');
  };

  return (
    <FormularioUsuario
      titulo="Registro"
      onSubmit={manejarRegistro}
      valoresIniciales={{ usuario: '', contraseña: '' }}
      botonTexto="Registrarse"
    />
  );
};



export default PantallaRegistro;