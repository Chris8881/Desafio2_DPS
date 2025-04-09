import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaInicio from './Pantallas/PantallaInicio';
import BotonMenu from './Componentes/BotonMenu';
import PantallaAgregarActividad from './Pantallas/PantallaAgregarActividad';
import PantallaEditarActividad from './Pantallas/PantallaEditarActividad';
import PantallaRegistro from './Pantallas/PantallaRegistro'; 
import PantallaLogin from './Pantallas/PantallaLogin';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="PantallaLogin" component={PantallaLogin} options={{
    headerLeft: null, title: 'RecordaTask'}} />
        <Stack.Screen 
  name="PantallaInicio" 
  component={PantallaInicio} 
  options={({ navigation }) => ({
    title: 'RecordaTask',headerLeft: null,
    headerRight: () => <BotonMenu navigation={navigation} />, 
  })}
/>
        <Stack.Screen name="PantallaAgregarActividad" component={PantallaAgregarActividad} options={{ 
      title: 'Agregar Actividad'}} />
        <Stack.Screen name='PantallaEditarActividad' component={PantallaEditarActividad} options={{ 
      title: 'Editar Actividad'}} />
        <Stack.Screen name="PantallaRegistro" component={PantallaRegistro} options={{ 
      title: 'RecordaTask'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
