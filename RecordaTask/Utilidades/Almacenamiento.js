import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar cuenta de usuario
export const guardarCuenta = async (nuevaCuenta) => {
  try {
    const cuentasGuardadas = await obtenerCuentas(); // Obtén todas las cuentas existentes
    const cuentasActualizadas = [...cuentasGuardadas, nuevaCuenta]; // Agrega la nueva cuenta
    await AsyncStorage.setItem('cuentas', JSON.stringify(cuentasActualizadas)); // Guarda el arreglo actualizado
    console.log('Cuenta guardada:', nuevaCuenta);
  } catch (error) {
    console.error('Error al guardar la cuenta:', error);
  }
};

// Obtener todas las cuentas
export const obtenerCuentas = async () => {
  try {
    const cuentas = await AsyncStorage.getItem('cuentas');
    return cuentas ? JSON.parse(cuentas) : []; // Devuelve un arreglo vacío si no hay cuentas
  } catch (error) {
    console.error('Error al obtener las cuentas:', error);
    return [];
  }
};

// Funciones de sesión
export const guardarSesionUsuario = async (usuario) => {
  try {
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
  } catch (error) {
    console.error('Error al guardar la sesión del usuario:', error);
  }
};

export const obtenerSesionUsuario = async () => {
  try {
    const usuario = await AsyncStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error('Error al obtener la sesión del usuario:', error);
  }
};

export const borrarSesionUsuario = async () => {
  try {
    await AsyncStorage.removeItem('usuario');
  } catch (error) {
    console.error('Error al borrar la sesión del usuario:', error);
  }
};

// Obtener actividades generales
export const obtenerActividades = async () => {
  try {
    const actividades = await AsyncStorage.getItem('actividades');
    return actividades ? JSON.parse(actividades) : [];
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    return [];
  }
};

// Guardar una nueva actividad general
export const guardarActividad = async (actividad) => {
  try {
    const actividades = await obtenerActividades();
    actividades.push(actividad);
    await AsyncStorage.setItem('actividades', JSON.stringify(actividades));
  } catch (error) {
    console.error('Error al guardar actividad:', error);
  }
};

// Actualizar actividad general
export const actualizarActividad = async (actividadActualizada) => {
  try {
    const actividades = await obtenerActividades();
    const index = actividades.findIndex(
      (actividad) => actividad.nombre === actividadActualizada.nombreOriginal
    );

    if (index !== -1) {
      actividades[index] = {
        ...actividadActualizada,
        nombreOriginal: undefined, // Elimina el campo temporal
      };
    }

    await AsyncStorage.setItem('actividades', JSON.stringify(actividades));
  } catch (error) {
    console.error("Error al actualizar actividad:", error);
  }
};

// Eliminar actividad general
export const eliminarActividad = async (nombre) => {
  try {
    const actividades = await obtenerActividades();
    const actividadesFiltradas = actividades.filter((actividad) => actividad.nombre !== nombre);
    await AsyncStorage.setItem('actividades', JSON.stringify(actividadesFiltradas));
  } catch (error) {
    console.error('Error al eliminar actividad:', error);
  }
};

// ===============================
// Funciones específicas por usuario
// ===============================

// Guardar actividades por usuario
export const guardarActividadPorUsuario = async (usuario, actividad) => {
  try {
    const actividades = await obtenerActividadesPorUsuario(usuario);
    actividades.push(actividad);
    await AsyncStorage.setItem(`actividades_${usuario}`, JSON.stringify(actividades));
  } catch (error) {
    console.error('Error al guardar actividad por usuario:', error);
  }
};

// Obtener actividades por usuario
export const obtenerActividadesPorUsuario = async (usuario) => {
  try {
    const actividades = await AsyncStorage.getItem(`actividades_${usuario}`);
    return actividades ? JSON.parse(actividades) : [];
  } catch (error) {
    console.error('Error al obtener actividades por usuario:', error);
    return [];
  }
};

// Eliminar actividad por usuario
export const eliminarActividadPorUsuario = async (usuario, nombreActividad) => {
  try {
    const actividades = await obtenerActividadesPorUsuario(usuario);
    const actividadesFiltradas = actividades.filter((actividad) => actividad.nombre !== nombreActividad);
    await AsyncStorage.setItem(`actividades_${usuario}`, JSON.stringify(actividadesFiltradas));
  } catch (error) {
    console.error('Error al eliminar actividad por usuario:', error);
  }
};

export const actualizarActividadPorUsuario = async (usuario, actividadActualizada) => {
  try {
    const actividades = await obtenerActividadesPorUsuario(usuario); // Obtén las actividades del usuario
    const index = actividades.findIndex((actividad) => actividad.nombre === actividadActualizada.nombreOriginal);

    if (index !== -1) {
      actividades[index] = { ...actividadActualizada, nombreOriginal: undefined }; // Actualiza la actividad
    }

    await AsyncStorage.setItem(`actividades_${usuario}`, JSON.stringify(actividades)); // Guarda las actividades actualizadas
  } catch (error) {
    console.error('Error al actualizar actividad por usuario:', error);
  }
};