import * as React from "react";
import { View , StyleSheet, AsyncStorage } from 'react-native';
import { MaterialIcons ,  AntDesign  , FontAwesome5 , Ionicons , Octicons} from "@expo/vector-icons";
import
{ 
        Container,
        Header, 
        Left,
        Body, 
        Right, 
        Title , 
        Text , 
        Content , 
        Card, 
      
        
  
} from 'native-base';
import * as Font from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import i18n from '../translator/translator.js';





class History extends React.Component
{
    constructor(){
        super();
        this.state={
            history:[],
            test_history:[],
            about_screen:false,



        }
    }


    async componentDidMount () {

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

       await this._getHistory();



    }

    _getHistory = async () =>{

        const history_items = await AsyncStorage.getItem('history');

        

        try
        {
            let convert_to_array = JSON.parse( history_items );


             return this.setState({
                history:convert_to_array
            })
        }
        catch
        {

        }

    }

   render()
   {

    if(this.state.history.length <= 0)
    {
        return(
            <Container>

            <Header
            androidStatusBarColor={'green'}
            style={{backgroundColor:"green"}}
            >
             <Left>
                 <MaterialIcons name={'menu'} size={30} style={{color:"#ffff"}} onPress={()=>{return this.props.navigation.openDrawer();}} />
             </Left>

             <Body>
             <Title style={{fontFamily:"Cairo_Bold"}}>{ i18n.t('d_history') }</Title>
             </Body>

             <Right>
             <AntDesign name="exclamationcircleo" size={24} color="#ffff" onPress={()=>{ return this.setState({about_screen:true}) }} />
             </Right>

            </Header>

            <View style={Style.no_history_contaner}>
                <Octicons name={'inbox'} size={60} color={"gray"} />
                <Text style={Style.no_history_text}>
                   { i18n.t('no_history') }
                </Text>
            </View>

            </Container>
        )
    }
    else
    {
        return(
            <Container>
 
                <Header
                androidStatusBarColor={'green'}
                style={{backgroundColor:"green"}}
                >
                 <Left>
                     <MaterialIcons name={'menu'} size={30} style={{color:"#ffff"}} onPress={()=>{return this.props.navigation.openDrawer();}} />
                 </Left>
 
                 <Body>
                 <Title style={{fontFamily:"Cairo_Bold"}}>{ i18n.t('d_history') }</Title>
                 </Body>
 
                 <Right>
                 <AntDesign name="exclamationcircleo" size={24} color="#ffff" onPress={()=>{ return this.setState({about_screen:true}) }} />
                 </Right>
 
                </Header>
 
                <Content>
                     <Text style={Style.screenTitle}>
                     { i18n.t('d_history') }
                     </Text>
                    <Card>
 
                     <Content style={Style.maninContaner}>
 
                         { this.state.history.map((day)=>
                         {
                             return(
                             <View key={day.id} >
                               <Text style={Style.dayTitle}>
                                     { day.date }
                               </Text>
                              { day.items.map((item)=>{
                                  return(
                                     <View  key={item.id} style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                     <Left style={{flex:1,flexDirection:"row"}}>
                                         <FontAwesome5  name={item.icon} size={12} style={{color:item.color,marginRight:"5%"}} />
                                  <Text style={Style.ItemsText}>  {item.name} </Text>
                                     </Left>
     
                                     <Right>
                                         <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                         <Text style={Style.ItemsText}> ${ item.price }</Text>
                                     </Right>
                                 </View>
                                  )
                              }) }   
 
 
 
                             </View>
                            
                            
                             
                             )
                         }) }
 
                        
                         
                            {/** The items view end */}  
 
                        
                     </Content>
 
                   
 
                    </Card>
                </Content>
 
         <AwesomeAlert
         show={this.state.about_screen}
         showProgress={false}
         title={i18n.t('mas_history_title')}
         message={i18n.t('mas_history')}
         closeOnTouchOutside={true}
         closeOnHardwareBackPress={true}
         showCancelButton={false}
         showConfirmButton={true}
         confirmText={i18n.t('cancel')}
         confirmButtonColor="green"
         onConfirmPressed={()=>{ return this.setState({about_screen:false}) }}
         
         />
 
            </Container>
        )
    }

       
   }
}

const Style = StyleSheet.create({

    screenTitle:{
        margin:"5%",
        fontFamily:"Cairo_Bold",
    },
    maninContaner:{
        margin:"2%",

    },
    ItemsText:{
        fontSize:12,
        fontFamily:"Cairo_Regular",

    
    },
    dayTitle:{
        fontSize:15,
        fontFamily:"Cairo_Bold",
    },
    no_history_contaner:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    no_history_text:{
        fontSize:25,
        color:"gray",
        fontFamily:"Cairo_Bold"
    }

})


export default History;


  


