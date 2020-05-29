import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title , Text , Content ,Card, CardItem , List , ListItem ,Thumbnail , Fab } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet , View , Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";


const screenWidth = Dimensions.get("window").width/1.1;


const data = {
  labels: ["Su", "Mo", "Tu", "We", "Th", "Fr","Sa"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43 , 150],
      color: (opacity = 2) => `rgba(0, 100, 0, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
 // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};

const chartConfig = {
  backgroundGradientFrom: "#228B22",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#006400",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true // optional
};




const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          active:false,
          items:[
            {"id":1,"image":"https://images-na.ssl-images-amazon.com/images/I/81MwSzttarL._SL1500_.jpg",'name':"tuna",'note':"bring 10 cans of tuna please :)","price":50,'amout':10},
            {"id":2,"image":"https://hips.hearstapps.com/vidthumb/images/delish-u-rice-2-1529079587.jpg",'name':"Rice",'note':"Bring 10KGs of Rice","price":70,'amout':1},
            {"id":3,"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/661px-Red_Apple.jpg",'name':"Apple",'note':"Bring 1Kg of Apples","price":50,'amout':1},
            {"id":4,"image":"https://images-na.ssl-images-amazon.com/images/I/71qyzy9QnML._SL1500_.jpg",'name':"Oats ",'note':"One Can of Oats","price":15,'amout':5},
            {"id":5,"image":"https://images-na.ssl-images-amazon.com/images/I/71xnxlsfqOL._AC_SX425_.jpg",'name':"Protien ",'note':"ON Marka","price":50,'amout':1},
            {"id":6,"image":"https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg",'name':"Pasta ",'note':"4 Pices of Pasta","price":1,'amout':4},
        ],
        today_expenses:0,
        today_limit:100, 
        above_limit:"green",
        };
      }
     
      async componentDidMount() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          Cairo_Black: require('../assets/fonts/Cairo_Black.ttf'),
          Cairo_Regular: require('../assets/fonts/Cairo-Regular.ttf'),
          Cairo_Bold: require('../assets/fonts/Cairo-Bold.ttf'),



          
          
          ...Ionicons.font,
        });

        Array.prototype.sum = function (prop) {
          var total = 0
          for ( var i = 0, _len = this.length; i < _len; i++ ) {
              total += this[i][prop]
          }
          return total
      }
      

        
        
        this.setState({
           isReady: true ,
           today_expenses:this.state.items.sum('price')
          });

          if(this.state.today_limit < this.state.today_expenses)
          {
            return this.setState({
              above_limit:"red"
            })
          }
      }
     
      render() {
        if (!this.state.isReady) {
          return <AppLoading />;
        }
     
        return (
            <Container>
            <Header
            style={{backgroundColor:"green"}}
            androidStatusBarColor={"green"}
            >
              <Left>
                <Button transparent>
                  <Icon name='wallet' />
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>Wallet</Title>
                </Body>
              <Right>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Right>
            </Header>
            <Content>
            <Text style={{marginLeft:"2%",marginTop:"2%",fontFamily: 'Cairo_Regular'}}>
                Today Expencise
            </Text>
            <Card>
            {/* <CardItem header>
              <Text style={styles.card_titles}>Daily Expencise</Text>
            </CardItem> */}
            <CardItem>

              <Body style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>


                <View style={{flexDirection: 'row', justifyContent: 'flex-end' , width:"50%"}}>

                  <View style={{flex:1,alignItems:"center"}}>

                        <Text style={{ fontSize:20,fontFamily: 'Cairo_Bold',color:this.state.above_limit}}>
                        {this.state.today_expenses}$
                        </Text>

                        <Text style={styles.card_data}>
                          Expencise
                        </Text>

                  </View>

                </View>
               
              
                  <View style={{flex:1,alignItems:"center",justifyContent:"center",width:"50%"}}>

                    <View style={{flex:1,alignItems:"center"}}>

                        <Text style={styles.money_text}>
                          {this.state.today_limit}$
                        </Text>

                        <Text style={styles.card_data}>
                         Less then
                        </Text>

                  </View>
                    
                  </View>
             

               
               
              
              </Body>

            </CardItem>
         </Card>
            

            <View style={{margin:"2%",fontFamily: 'Cairo_Regular'}}>
                <Text style={{fontFamily: 'Cairo_Regular'}}>
                    Today Items List
                </Text>
                <List>

                 {this.state.items.map((item)=>{
                   return(
                    <ListItem key={item.id} avatar>
                    <Left>
                      <Thumbnail source={{ uri: item.image }} />
                    </Left>
                    <Body>
                      <Text>{ item.name }</Text>
                      <Text note>{ item.note }</Text>
                    </Body>
                    <Right>
                      <Text note>{ item.price }$</Text>
                      <Text >X{ item.amout }</Text>
                    </Right>
                  </ListItem>
                   )
                 })}
          </List>
            </View>

           <View style={{margin:"2%",marginLeft:"3%"}}>
           <Text style={{fontFamily: 'Cairo_Regular'}}>
                    Week Expencises
                </Text>
             <Card>
             <LineChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
            </Card>   
          
           </View>


            </Content>
            <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: 'green' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
                <Icon name='add' />
                <Content style={{backgroundColor:"orange"}}>
                        <Icon  name='flame' />
                </Content>
                <Content style={{backgroundColor:"orange"}}>
                        <Icon name='nutrition' /> 
                </Content>
            </Fab>
          </Container>
    
        );
      }
}

export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card_titles:{
    fontSize:18,
    fontFamily: 'Cairo_Regular'
  },
  card_data:{
    fontSize:20,
    fontFamily: 'Cairo_Bold',
  },
  money_text:{
    fontSize:20,
    fontFamily: 'Cairo_Bold',
    color:"green",
  }
});
