import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5  } from '@expo/vector-icons';

import Main from "../component/Main.js";
import History from "../component/History.js";


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Main}
         options={{ drawerLabel: 'Home' , drawerIcon: () => { return <FontAwesome5 name={"home"} size={18} style={{color:"gray"}} /> } }}
        
        />
        <Drawer.Screen name="History" component={History}
        options={{ drawerLabel: "History" , drawerIcon: ()=>{ return <FontAwesome5 name={'history'}  size={18}  style={{color:"gray"}} /> } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
