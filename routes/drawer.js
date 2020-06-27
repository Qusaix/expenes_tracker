import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5  } from '@expo/vector-icons';
import i18n from '../translator/translator.js';


import Main from "../component/Main.js";
import History from "../component/History.js";
import About from "../component/AboutUs.js"


const Drawer = createDrawerNavigator();




export default class App extends React.Component {


  async componentDidMount ()
  {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Cairo_Black: require('../assets/fonts/Cairo_Black.ttf'),
      Cairo_Regular: require('../assets/fonts/Cairo-Regular.ttf'),
      Cairo_Bold: require('../assets/fonts/Cairo-Bold.ttf'),
      Cairo_SemiBold: require('../assets/fonts/Cairo-SemiBold.ttf'),




      
      
    });
 
  }

  render()
  {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home"
         drawerContentOptions={{
          activeTintColor: 'green',
          labelStyle:{
            fontFamily:"Cairo_Bold"
          }
        }} 
        >
          <Drawer.Screen name="Home" component={Main}
           options={{ drawerLabel: i18n.t('d_home') , drawerIcon: () => { return <FontAwesome5 name={"home"} size={18} style={{color:"gray"}} /> } }}

          />
          <Drawer.Screen name="History" component={History}
          options={{ drawerLabel: i18n.t('d_history') , drawerIcon: ()=>{ return <FontAwesome5 name={'history'}  size={18}  style={{color:"gray"}} /> } }}
          />
          <Drawer.Screen name="About" component={About}
          options={{ drawerLabel: i18n.t('about_us') , drawerIcon:()=>{ return  <FontAwesome5 name={'exclamation'}  size={18}  style={{color:"gray"}} /> }}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  
}
