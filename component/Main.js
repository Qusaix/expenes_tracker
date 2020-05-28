import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Left, Body, Right, Button, Icon, Title , Text , Content ,Card, CardItem , List , ListItem ,Thumbnail , Fab } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet , View } from "react-native";
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
          active:false
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
        
        this.setState({ isReady: true });
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
                  <Icon name='star' />
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>Wendesday</Title>
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
                <View
                style={{flexDirection: 'row', justifyContent: 'flex-end'}}
                >
                <Text style={styles.card_data}>
                  Less then :50$
                </Text>
                </View>
                <View
                style={{flexDirection: 'row', justifyContent: 'flex-start',marginLeft:"17%"}}
                >
                <Text style={styles.card_data}>
                  Expencise :50$
                </Text>
                </View>
               
              </Body>
            </CardItem>
         </Card>
            

            <View style={{margin:"2%",fontFamily: 'Cairo_Regular'}}>
                <Text>
                    items you bought
                </Text>
                <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81MwSzttarL._SL1500_.jpg' }} />
              </Left>
              <Body>
                <Text>Tuna Can</Text>
                <Text note>bring 10 cans of tuna please :)</Text>
              </Body>
              <Right>
                <Text note>50$</Text>
                <Text >X10</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://hips.hearstapps.com/vidthumb/images/delish-u-rice-2-1529079587.jpg' }} />
              </Left>
              <Body>
                <Text>Rice</Text>
                <Text note>We need 3KG of Rice</Text>
              </Body>
              <Right>
                <Text note>70$</Text>
                <Text >X1</Text>
              </Right>
            </ListItem>
            
            
          </List>
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
                        <Icon style name='flame' />
                </Content>
                <Content style={{backgroundColor:"orange"}}>
                        <Icon style name='nutrition' />
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
  }
});
