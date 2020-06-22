import * as React from "react";
import { View , StyleSheet } from 'react-native';
import { MaterialIcons ,  AntDesign  , FontAwesome5 , Ionicons} from "@expo/vector-icons";
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




class History extends React.Component
{
    constructor(){
        super();
        this.state={
            history:[],
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

    }

   render()
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
                <Title style={{fontFamily:"Cairo_Bold"}}>History</Title>
                </Body>

                <Right>
                <AntDesign name="exclamationcircleo" size={24} color="#ffff" onPress={()=>{ return this.setState({about_screen:true}) }} />
                </Right>

               </Header>

               <Content>
                    <Text style={Style.screenTitle}>
                        Expeneces History
                    </Text>
                   <Card>

                    <Content style={Style.maninContaner}>
                        <Text style={Style.dayTitle}>
                            24 May 2020
                        </Text>

                           {/** The items view */}

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}}>
                                    <FontAwesome5  name={'pizza-slice'} size={12} style={{color:"orange",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}>Pizza</Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $55</Text>
                                </Right>
                            </View>

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}} >
                                    <FontAwesome5  name={'bus-alt'} size={12} style={{color:"#3387ff",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}> Going To Amman </Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $5</Text>
                                </Right>
                            </View>

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}} >
                                    <FontAwesome5  name={'bowling-ball'} size={12} style={{color:"red",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}> Watching New Movie </Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $25</Text>
                                </Right>
                            </View>

                            <Text style={Style.dayTitle}>
                            23 May 2020
                        </Text>

                           {/** The items view */}

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}}>
                                    <FontAwesome5  name={'pizza-slice'} size={12} style={{color:"orange",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}>Pizza</Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $55</Text>
                                </Right>
                            </View>

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}} >
                                    <FontAwesome5  name={'bus-alt'} size={12} style={{color:"#3387ff",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}> Going To Amman </Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $5</Text>
                                </Right>
                            </View>

                            <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
                                <Left style={{flex:1,flexDirection:"row"}} >
                                    <FontAwesome5  name={'bowling-ball'} size={12} style={{color:"red",marginRight:"5%"}} />
                                    <Text style={Style.ItemsText}> Watching New Movie </Text>
                                </Left>

                                <Right>
                                    <FontAwesome5  name={'money-bill'} size={12} style={{color:"#000"}} />
                                    <Text style={Style.ItemsText}> $25</Text>
                                </Right>
                            </View>
                          

                           {/** The items view end */}  

                       
                    </Content>

                  

                   </Card>
               </Content>

        <AwesomeAlert
        show={this.state.about_screen}
        showProgress={false}
        title={"History"}
        message={'In this screen you can see all your expeneces'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={"Close"}
        confirmButtonColor="green"
        onConfirmPressed={()=>{ return this.setState({about_screen:false}) }}
        
        />

           </Container>
       )
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
    }

})


export default History;


  


