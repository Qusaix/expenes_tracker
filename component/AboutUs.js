import React from "react";
import * as Font from 'expo-font';
import {StyleSheet,View,Image} from "react-native";
import {
     Text,
     Header,
     Container,
     Content,
     Right,
     Left,
     Button,
     Body,
     Title


    
    } from 'native-base';
    import { Ionicons , FontAwesome5 , MaterialCommunityIcons , Octicons , AntDesign , MaterialIcons} from '@expo/vector-icons';

// import { SocialIcon } from 'react-native-elements';
import i18n from '../translator/translator.js';


class About extends React.Component
{
    async componentDidMount ()
    {
         /**  LOAD THE FONTS  */ 

         await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Cairo_Black: require('../assets/fonts/Cairo_Black.ttf'),
            Cairo_Regular: require('../assets/fonts/Cairo-Regular.ttf'),
            Cairo_Bold: require('../assets/fonts/Cairo-Bold.ttf'),
            Cairo_SemiBold: require('../assets/fonts/Cairo-SemiBold.ttf'),




            
            
            ...Ionicons.font,
          });
    }

    render(){
        return(
            <Container>
            <Header
             style={{backgroundColor:"green"}}
             androidStatusBarColor={"green"}
             >
               <Left>
                 <Button  onPress={()=>{
                   this.setState({
                     add_item_screen:false,
                   })
                 }} transparent>
                   <MaterialIcons name='menu' size={30} style={{color:"#fff"}}
                   onPress={()=>{ return this.props.navigation.openDrawer() }}
                   />
                 </Button>
               </Left>
               <Body>
                 <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>{i18n.t('about_us')}</Title>
               </Body>
               <Right>
                 <Button  transparent>
                   {/* <Icon name='menu' /> */}
                   {/* <Text style={{fontSize:20,fontFamily:"Cairo_Bold"}}>
                    Fri 01
                   </Text> */}
 
                 </Button>
               </Right>
             </Header>

             <View style={style.container}>

                   <Image source={require('../assets/israrLogo.gif')} style={style.companyLogo} />

            <Text style={style.des}>
                  {i18n.t('created')} 

            </Text>
            
              <Text style={style.des} >
              {i18n.t('fallow')} 
              </Text>
              {/* <SocialIcon type='facebook' />  */}
              <Text>@israrTeam</Text>



      </View>

             
             </Container>

            
        )
    }
}


export default About;




const style = StyleSheet.create({
    main_contaner:{
        justifyContent:"center",
     },
     container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      social: {
          flexDirection:"row",
      },
      des:{
          fontFamily:'Cairo_Regular',
          fontSize:14
      },
      companyLogo:{
          width:150,
          height:250
      },
})
