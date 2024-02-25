import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import DashboardScreen from './screens/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#2fd281',
        tabBarInactiveBackgroundColor: '#2fd281',
        tabBarActiveTintColor: 'white'
      }}
    >
      <Tab.Screen name = 'Home' component={HomeScreen} />
      <Tab.Screen name = 'Dashboard' component={DashboardScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Base'
        screenOptions={{
          headerBackTitleVisible: false,
          ...TransitionPresets.ModalPresentationIOS
        }}
      >
        <Stack.Screen name = 'Base' component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}