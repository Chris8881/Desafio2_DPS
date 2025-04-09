import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonMenu({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const cerrarSesion = () => {
    setMenuVisible(false);
    navigation.navigate('PantallaLogin'); 
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setMenuVisible(!menuVisible)} 
        style={{ marginRight: 15 }}
      >
        <Text style={{ color: '#007BFF', fontSize: 16 }}>Menú</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={cerrarSesion} style={styles.menuItem}>
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#12a14b',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
    minWidth: 150, 
  },
  menuItem: {
    padding: 10,
    alignItems: 'center', 
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
});