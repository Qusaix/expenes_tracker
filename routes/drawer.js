import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons , FontAwesome5 , MaterialCommunityIcons , Octicons , AntDesign } from '@expo/vector-icons';

import Main from "../component/Main.js"
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Main}
         options={{ drawerLabel: 'Home' , drawerIcon: () => { return <FontAwesome5 name={"home"} size={18} style={{color:"gray"}} /> } }}
        
        />
        <Drawer.Screen name="History" component={NotificationsScreen}
        options={{ drawerLabel: "History" , drawerIcon: ()=>{ return <FontAwesome5 name={'history'}  size={18}  style={{color:"gray"}} /> } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
