import * as React from "react";
import { View , StyleSheet } from 'react-native';
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




class History extends React.Component
{
    constructor(){
        super();
        this.state={
            history:[
                {
                    "id":1,
                    'date':"24 May 2020",
                    'items':
                    [
                        {
                            "name":"pizza",
                            'price':50,
                            'icon':'pizza-slice',
                            'color':'orange'
                        },
                        {
                            "name":"Amman",
                            'price':50,
                            'icon':'bus-alt',
                            'color':'#3387ff'
                        },


                    ]
                },
                {
                    "id":2,
                    'date':"25 May 2020",
                    'items':
                    [
                        {
                            "name":"ملوخية",
                            'price':2,
                            'icon':'pizza-slice',
                            'color':'orange'
                        },
                        {
                            "name":"فلم جديد",
                            'price':20,
                            'icon':'bowling-ball',
                            'color':'red'
                        },


                    ]
                }
            ],
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

    if(this.state.history.length == 0)
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

            <View style={Style.no_history_contaner}>
                <Octicons name={'inbox'} size={60} color={"gray"} />
                <Text style={Style.no_history_text}>
                   There is No History Yet
                </Text>
            </View>

            </Container>
        )
    }

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

                        { this.state.history.map((day)=>
                        {
                            return(
                            <View>
                              <Text style={Style.dayTitle}>
                                    { day.date }
                              </Text>
                             { day.items.map((item)=>{
                                 return(
                                    <View style={{flex:1,flexDirection:"row",padding:"2%"}}>
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


  


