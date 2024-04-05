import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import DashboardScreen from './screens/Dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTaskScreen from './screens/AddTask';
import EditTaskScreen from './screens/EditTask';
import { retrieve, save, clearStorage } from './utils/utility';
import { useEffect } from 'react';

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
      <Tab.Screen 
        name = 'Home' 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={30} color={focused ? 'white' : 'gray'} />
          )
        }}
      />
      <Tab.Screen 
        name = 'Dashboard' 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="user" size={30} color={focused ? 'white' : 'gray'} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  clearStorage();

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
        <Stack.Screen name = 'Add Task' component={AddTaskScreen} options={{}} />
        <Stack.Screen name = 'Edit Task' component={EditTaskScreen} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}