import * as React from 'react';
import Main from "./component/Main.js";
import Drawer_App from "./routes/drawer.js";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


export default function App() {
  return (
    <Drawer_App />
  );
}