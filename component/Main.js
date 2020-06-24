import React from 'react';
import { AppLoading  , Notifications } from 'expo';
import { Container,
  Header, 
  Left,
   Body, 
   Right, 
   Button, 
   Icon, 
   Title , 
   Text , 
   Content , 
   Card, 
   CardItem , 
   List , 
   ListItem , 
   Fab , 
   Form , 
   Item , 
   Input ,
   

  } from 'native-base';
  import { 
    StyleSheet ,
    View ,
    Dimensions ,
    TouchableOpacity ,
    AsyncStorage ,
    AppState
           
  } from "react-native";

import * as Font from 'expo-font';
import { Ionicons , FontAwesome5 , MaterialCommunityIcons , Octicons , AntDesign , MaterialIcons} from '@expo/vector-icons';
import { LineChart} from "react-native-chart-kit";
import { PieChart } from 'react-native-svg-charts'
import { SwipeListView } from 'react-native-swipe-list-view'; /** Delete this packiage */
import AwesomeAlert from 'react-native-awesome-alerts';
import DialogInput from 'react-native-dialog-input';
import i18n from '../translator/translator.js';
import Onboarding from 'react-native-onboarding-swiper';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';




const screenWidth = Dimensions.get("window").width/1.1;




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



class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          active:false,
          items:[],
        today_expenses:0,
        today_limit:100, 
        above_limit:"green",
        showAlert: false,
        chosen_item_index:null,
        add_item_screen:false,
        cat_icon:"bus-alt",
        add_screen_title:"Title",
        new_item_name:"",
        new_item_note:"",
        new_item_price:0,
        new_item_icon:"",
        new_item_color:"",
        test_array:[],
        no_items:true, 
        isDialogVisible:false,
        week_expences:[0,0,0,0,0,0,0],
        avg_week_expeneces:0,
        error:false,
        first_time:false,
        expoPushToken: '',
        notification: {},
        appState: AppState.currentState,
        over_all_info:[
          {
            id:1,
            type:"Transportation",
            expeneses:10,
            color:"#3387ff"
          },
          {
            id:2,
            type:"Entertainment",
            expeneses:10,
            color:"red"
          },
          {
            id:3,
            type:"Food",
            expeneses:10,
            color:"orange" 
          },
      ],
      overAll_FoodExpeneces:0,
      overAll_transportationExpeneces:0,
      overAll_entertainmentExpeneces:0,
      analytics:false,
      minus_price:0,
      minus_color:'',
      history:[],


        
        


        
        };
      }

      // registerForPushNotificationsAsync = async () => {
      //   if (Constants.isDevice) {
      //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      //     let finalStatus = existingStatus;
      //     if (existingStatus !== 'granted') {
      //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      //       finalStatus = status;
      //     }
      //     if (finalStatus !== 'granted') {
      //       alert('Failed to get push token for push notification!');
      //       return;
      //     }
      //     token = await Notifications.getExpoPushTokenAsync();
      //     console.log(token);
      //     this.setState({ expoPushToken: token });
      //   } else {
      //     alert('Must use physical device for Push Notifications');
      //   }
    
      //   if (Platform.OS === 'android') {
      //     Notifications.createChannelAndroidAsync('default', {
      //       name: 'default',
      //       sound: true,
      //       priority: 'max',
      //       vibrate: [0, 250, 250, 250],
      //     });
      //   }
      // };

      // _sendLocalNotification = () => {
      //   const localnotification = {
      //     title: 'Hi!:)',
      //     body: 'Did You Track Your Expeneces Today ?',
      //     android: {
      //       sound: true,
      //     },
      //     ios: {
      //       sound: true,
      //     },

      //   };
      //   let sendAfterFiveSeconds = Date.now();
      //   sendAfterFiveSeconds += 5000;
    
      //   const schedulingOptions = { time: sendAfterFiveSeconds };
      //   Notifications.scheduleLocalNotificationAsync(
      //     localnotification,
      //     schedulingOptions
      //   );
      // };
    
     
      async componentDidMount() {

         
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

          let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
          }


         

      /**  GET THE APP STATE  */ 

      //AppState.addEventListener('change', this._handleAppStateChange);

      /** SEND NOTIFICTION  */ 
       
      //  this._sendLocalNotification();

      /** CHECK IF THIS THE FIRST TIME USER OPEND THE APP */ 

      this._checkFirstTime();


      /** CREATE USER INFOS */ 
          
      await this._create_user_info()

      /** CREATE OVERALL EXPENECE */
      await this._takeOverallExpeneces()


      /** CHECK IF THERE IS ANY ITEMS TO WHTER OR NOT SHOW THE NO ITEMS MESSAGE */ 
          
      if(this.state.items.length > 0)
        {
          this.setState({
            no_items:false
          })
        }
          
        /** ADD THE NEW VALUES TO THE STATE */ 
        let get_today_expeneces = this.state.items;
        let get_all_prices = [];
        let change_to_number;
        let x;
        for(x=0;x<get_today_expeneces.length;x++) 
        {
          change_to_number = parseInt(get_today_expeneces[x].price)
          let Expencise = {"price":change_to_number};
          get_all_prices.push(Expencise);
        }
        

         this.setState({
            isReady: true ,
            today_expenses:get_all_prices.sum('price')
            });

        /** CHECK THE LIMIT IF IT'S LESS THEN EXPENECE CHANGE IT TO RED*/    
            if(this.state.today_limit < this.state.today_expenses)
            {
              return this.setState({
                above_limit:"red"
              })
            } 
        


      }

  

      _checkFirstTime = async ()=>{

        let check_user = await AsyncStorage.getItem('first_time_user');

        if(check_user == null)
        {
          this.setState({
            first_time:true
          })
          
          AsyncStorage.setItem('first_time_user','false');
          
        }

      }

      _addToHistory =  async ( items )=>{

        let today_is = await AsyncStorage.getItem('day');
        let history = await AsyncStorage.getItem('history');
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let d = new Date();
        let history_element = {'id':0,'date':null,'items':[]};

        /** check if wrere in the same day or not */
       if( d.getDay() !== today_is )
       {
          if( history !== null )
          {
            
            try
            {
            
              
              history_items = JSON.parse( history );

              history_element.id = Math.random() * Math.floor(10000);
              history_element.date = d.getDate() - 1 +" "+ months[d.getMonth()] +" "+ d.getFullYear();
              history_element.items = items;


              history_items.push( history_element );


              AsyncStorage.setItem('history',JSON.stringify(history_items));




              

            }
            catch
            {

            }

          }
          else
          {
   
           AsyncStorage.setItem('history',JSON.stringify([]));
   
          }

       }
      



      }

      _create_user_info = async ()=>{
        
        
        
        
        let user_limit = await AsyncStorage.getItem('user_limit');
        let today_is = await AsyncStorage.getItem('day');
        //let today_is = 5;
        let yester_day_expences = await AsyncStorage.getItem('yesterday_expence');
        let check_week_data = await AsyncStorage.getItem('week');

        var days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
        var d = new Date();
    
      
      /** 
       * check the day if we are not in the same day save expenese and  delete all data
       * if this is the first time the user opend the app create new week expences with
       * 0 value to every day
       */

      let day_expences;
      if(today_is != null && check_week_data != null )
      {


        if(days[d.getDay()] != days[today_is]) 
        {

          

          try {
            const week_data = await AsyncStorage.getItem('week');
            const days_data = JSON.parse(week_data); 
            
           
            
            if (days_data !== null) {

              

              days_data[today_is] = yester_day_expences; 

              console.log("after: ",days_data)


              
             let change_to_num = [];
             let num;

             let w;
             for(w=0; w < days_data.length ; w++)
             {
               num = parseInt(days_data[w]);
               change_to_num.push(num);
             }

             // get the avg expencises
             let hole_week_expeneces =  change_to_num.reduce((a, b) => a + b, 0);
             let week_avg = hole_week_expeneces/7;
             let float_the_num = week_avg.toFixed(2)
             
             this.setState({
               week_expences:change_to_num,
               avg_week_expeneces:float_the_num,
               items:[],
             })

             AsyncStorage.setItem('week',JSON.stringify(this.state.week_expences))

           //  AsyncStorage.setItem('yesterday_expence',JSON.stringify(0));


            }
          } catch (error) {
            // Error retrieving data
          }


          AsyncStorage.setItem('day',JSON.stringify(d.getDay()));

        }
        else
        {
          try {
            const week_data = await AsyncStorage.getItem('week');
            const days_data = JSON.parse(week_data); // this is how you get back the array stored
           
            if (days_data !== null) {

              console.log("berfore: ",days_data) 

              

              days_data[today_is] = yester_day_expences; 

              console.log("after: ",days_data)


              
             let change_to_num = [];
             let num;

             let w;
             for(w=0; w < days_data.length ; w++)
             {
               num = parseInt(days_data[w]);
               change_to_num.push(num);
             }

             // get the avg expencises
             let hole_week_expeneces =  change_to_num.reduce((a, b) => a + b, 0);
             let week_avg = hole_week_expeneces/7;
             let float_the_num = week_avg.toFixed(2)

             this.setState({
               week_expences:change_to_num,
               avg_week_expeneces:float_the_num,
               items:[],
             })

             AsyncStorage.setItem('week',JSON.stringify(this.state.week_expences))

           //  AsyncStorage.setItem('yesterday_expence',JSON.stringify(0));


            }
          } catch (error) {
            // Error retrieving data
          }
        }






       
      }
      else
      {
       
        AsyncStorage.setItem('day',JSON.stringify(d.getDay()))
        AsyncStorage.setItem('week',JSON.stringify([0,0,0,0,0,0,0]))
        AsyncStorage.setItem('yesterday_expence',JSON.stringify(this.state.today_expenses))


      }
 

      // check user have a daly budget if ther none show alert  
        if(user_limit != null)
        {
          this.setState({
            today_limit:user_limit
          })
        }
        else
        {
          this.setState({
            isDialogVisible:true
          })
        }


        // Add sum the values in the array
        Array.prototype.sum = function (prop) {
          var total = 0
          for ( var i = 0, _len = this.length; i < _len; i++ ) {
              total += this[i][prop]
          }
          return total
        }

      // get the previse saved items and check if we still in the same day
        if(days[d.getDay()] == days[today_is])
        {
         
            try {
              const value = await AsyncStorage.getItem('items');
              const json = JSON.parse(value); // this is how you get back the array stored

           
              if (json !== null) {
                this.setState({
                items:json,
              })

            
              }
            } catch (error) {
              // Error retrieving data
            }
        }
        else
        {

          try
          {
            const value = await AsyncStorage.getItem('items');
            const json = JSON.parse(value);


             /** ADD TO HISTORY */
             await this._addToHistory( json );


            AsyncStorage.setItem('items',JSON.stringify([]));

            this.setState({
             items:[]
           })

          }
          catch
          {

          }
          
        
        }
      
    


      }

      _removeItem = ()=>{
       
        let items_array = this.state.items;
        let index = this.state.chosen_item_index;
        let get_all_prices = [];
        const check_item = items_array.indexOf(index)
        let color;

        
          /**
         * REMOVE ITEM PRICE FROM OVERALL EXPENECES 
         */

        this.setState({
          minus_price:items_array[index].price,
          minus_color:items_array[index].color
        })

        this._removeFromStorage();
       

 

       
          /**
         * REMOVE ITEM FROM ITEM LIST 
         */
             
        if(check_item === -1) 
        { 
          items_array.splice(index,1);

        let x;
        let change_to_number;
        for(x=0;x<items_array.length;x++) 
        {
          change_to_number = parseInt(items_array[x].price)
          let Expencise = {"price":change_to_number};
          get_all_prices.push(Expencise);

        }
           let d = new Date();
           this.state.week_expences[d.getDay()] = get_all_prices.sum('price');


           this.setState({
            items:items_array,
            today_expenses:get_all_prices.sum('price'),
            week_expences:this.state.week_expences,
            showAlert:false,
          });
          

          if(items_array.sum('price') >  this.state.today_limit )
          {
            color = "red";
          }
          else
          {
            color = "green";
          }

          if(this.state.items.length == 0)
          {
            this.setState({
              no_items:true,
            })
          }

        

          AsyncStorage.setItem('items',JSON.stringify(this.state.items)); 
          AsyncStorage.setItem('yesterday_expence',JSON.stringify(this.state.today_expenses));

       



           this.setState({above_limit:color})
        
        
        


        }

      
       
        
    
      }

      _removeFromStorage = async ()=>{
          
          let get_over_allFoodExpeneces = await AsyncStorage.getItem('overAll_FoodExpeneces');
          let get_over_all_TransportationExpeneces = await AsyncStorage.getItem('overAll_transportationExpeneces');
          let get_over_allentertainment = await AsyncStorage.getItem('overAll_entertainmentExpeneces');
          let color = this.state.minus_color;
          let minus_price = this.state.minus_price;
        


          if(color == "orange")
          {
            let EQ = parseInt(get_over_allFoodExpeneces) - parseInt(minus_price); 
            AsyncStorage.setItem('overAll_FoodExpeneces',JSON.stringify(EQ))
          }
  
          if(color == "#3387ff")
          {
            let EQ = parseInt(get_over_all_TransportationExpeneces) - parseInt(minus_price)
            AsyncStorage.setItem('overAll_transportationExpeneces',JSON.stringify(EQ))
          }
  
          if(color == "red")
          {
            let EQ = parseInt(get_over_allentertainment) - parseInt(minus_price)
            AsyncStorage.setItem('overAll_entertainmentExpeneces',JSON.stringify(EQ))
          }

          if(get_over_allFoodExpeneces == 0 && get_over_all_TransportationExpeneces == 0 && get_over_allentertainment == 0)
          {
            this.setState({
              analytics:true,
            })
          }
      }

      _addItem = async () => {

        if(this.state.new_item_name == "" || this.state.new_item_price == "")
        {
          
        
          alert(i18n.t('err_msg')) 
          
          return;
        }

        let all_items = this.state.items;
        let id = Math.random();
        let color;

        let new_item = {
          id:id,
          name:this.state.new_item_name,
          icon:this.state.new_item_icon,
          note:this.state.new_item_note,
          price:this.state.new_item_price,
          color:this.state.new_item_color,
          amout:0
        };

        all_items.push(new_item);
       let equation = this.state.today_expenses + parseInt(new_item.price);


         this.setState({
          items:all_items,
          today_expenses:equation,
          no_items:false,
          add_item_screen:false
        });

        if(equation >  this.state.today_limit )
        {
          color = "red";
        }
        else
        {
          color = "green";
        }
        
        var d = new Date();
        

        this.state.week_expences[d.getDay()] = equation;


        AsyncStorage.setItem('items',JSON.stringify(all_items)); 
        AsyncStorage.setItem('yesterday_expence',JSON.stringify(equation));

        
        // get the avg expencises
        // let hole_week_expeneces =  change_to_num.reduce((a, b) => a + b, 0);
        // let week_avg = hole_week_expeneces/7;
        // let float_the_num = week_avg.toFixed(2)

        /**
         * SAVE TO OVERALL EXPENECES 
         */
        if(this.state.new_item_color == "orange")
        {
          let get_over_allFoodExpeneces = await AsyncStorage.getItem('overAll_FoodExpeneces');         
          let EQ = parseInt(get_over_allFoodExpeneces) + parseInt(this.state.new_item_price); 
          AsyncStorage.setItem('overAll_FoodExpeneces',JSON.stringify(EQ))
        }

        if(this.state.new_item_color == "#3387ff")
        {
          let get_over_all_TransportationExpeneces = await AsyncStorage.getItem('overAll_transportationExpeneces');
          let EQ = parseInt(get_over_all_TransportationExpeneces) + parseInt(this.state.new_item_price)
          AsyncStorage.setItem('overAll_transportationExpeneces',JSON.stringify(EQ))
        }

        if(this.state.new_item_color == "red")
        {
          let get_over_allentertainment = await AsyncStorage.getItem('overAll_entertainmentExpeneces');
          let EQ = parseInt(get_over_allentertainment) + parseInt(this.state.new_item_price)
          AsyncStorage.setItem('overAll_entertainmentExpeneces',JSON.stringify(EQ))
        }



        return this.setState({
          above_limit:color,
          week_expences:this.state.week_expences,
          new_item_name:'',
          new_item_note:'',
          new_item_price:'',

        })
      

      }

      _takeTodaylimit  = async ( limit ) => {

        this.setState({
          today_limit:limit,
          isDialogVisible:false
        })

        if(this.state.today_expenses < limit)
        {
          this.setState({
            above_limit:"green",
          })
        }else
        {
          this.setState({
            above_limit:"red",
          })
        }

       return AsyncStorage.setItem('user_limit',limit);

      }

      _takeOverallExpeneces = async () =>{

        /** GET THE USER OVERALL EXPENECES DATA*/
        const food_expeneces = await AsyncStorage.getItem('overAll_FoodExpeneces');
        const transportation_expeneces = await AsyncStorage.getItem('overAll_transportationExpeneces');
        const entertainment_expeneces = await AsyncStorage.getItem('overAll_entertainmentExpeneces');


        /** CHECK IF THE USER HAVE OVER ALL EXPENECE 
         * IF NOT CREATE ONE
         */
        if(food_expeneces == null || transportation_expeneces == null || entertainment_expeneces == null)
        {

          /** CREATING USER OVERALL EXPENECES */
          AsyncStorage.setItem('overAll_FoodExpeneces',JSON.stringify(0));
          AsyncStorage.setItem('overAll_transportationExpeneces',JSON.stringify(0));
          AsyncStorage.setItem('overAll_entertainmentExpeneces',JSON.stringify(0));


         /** AFTER CREATEING THE EXPENECES EXIT THE FUNCTION */
          return this.setState({
            analytics:true,
          });

        }
        else
        {

          /** UPDATE THE OVERALL EXPENECES INFO */

          let info_array = this.state.over_all_info;

          info_array[0].expeneses = parseInt(transportation_expeneces);
          info_array[1].expeneses = parseInt(entertainment_expeneces);
          info_array[2].expeneses = parseInt(food_expeneces);
          
          return this.setState({
              over_all_info:info_array,
              overAll_FoodExpeneces:parseInt(food_expeneces),
              overAll_transportationExpeneces:parseInt(transportation_expeneces),
              overAll_entertainmentExpeneces:parseInt(entertainment_expeneces),
              
          });




          

        }



      }
     
      render() {

       
        const pieData = this.state.over_all_info
            .filter((value) => value.id > 0)
            .map((value, index) => ({
                value:value.expeneses,
                svg: {
                    fill: value.color,
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))


        if (!this.state.isReady) {
          return <AppLoading />;
        }
 
        if(this.state.first_time)
        {
          return(
            <Onboarding
            pages={[
              {
                backgroundColor: '#006400',
                image: <FontAwesome5 name='smile' size={100} style={{color:"#fff"}} />,
                title: i18n.t('tut_welcome'),
                subtitle: i18n.t('tut_welcome_sub'),
              },
              {
                backgroundColor: '#006400',
             //   image: <Image source={{uri:"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"}} style={{width:300,height:100}} />,
                image: <FontAwesome5 name='plus' size={100} style={{color:"#fff"}} />,
                title: i18n.t('tut_how_to_add_items'),
                subtitle: i18n.t('tut_how_to_add_items_sub'),
              },
              {
                backgroundColor: '#006400',
               // image: <Image source={{uri:"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"}} style={{width:150,height:180}} />,
                image: <Octicons name='gear' size={100} style={{color:"#fff"}} />,
                title: i18n.t('tut_change_exp') ,
                subtitle: i18n.t('tut_change_exp_sub'),
              },
              
            ]}
            onDone={()=>{this.setState({first_time:false})}}
            onSkip={()=>{this.setState({first_time:false})}}
            titleStyles={{fontFamily:"Cairo_Bold"}}
            subTitleStyles={{fontFamily:"Cairo_Regular"}}
            nextLabel={i18n.t('next')}
            skipLabel={i18n.t('skip')}
          />
          
          )
        

        }

        if(this.state.add_item_screen)
        {
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
                  <MaterialCommunityIcons name='exit-run' size={24} style={{color:"#fff"}} />
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>{i18n.t('back')}</Title>
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
            <Content>
              <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:"10%"}}>
              <FontAwesome5 name={this.state.cat_icon} size={60} style={{color:"gray"}} /> 
                <Text style={{fontFamily:"Cairo_SemiBold",fontSize:25,color:"gray"}}>{this.state.add_screen_title}</Text>
              </View>
              <Form>
                <Item>
                  <Input   placeholder={i18n.t('name')} onChangeText={(data)=>{
                    this.setState({
                      new_item_name:data
                    })
                  }} />
                </Item>
                <Item>
                  <Input placeholder={i18n.t('note')}  
                  onChangeText={(data)=>{
                    this.setState({
                      new_item_note:data
                    })
                  }}
                  />
                </Item>
                <Item last>
                  <Input keyboardType='numeric' placeholder={i18n.t('price')}  onChangeText={(data)=>{
                    this.setState({
                      new_item_price:data
                    })
                  }} />
                </Item>
                {/* <Item last>
                  <Input placeholder="Amout" />
                </Item> */}
                         

              </Form>
              <View style={{flex:1,alignItems:"center"}}>
                <TouchableOpacity style={{width:"95%",backgroundColor:"green", alignItems:"center",marginTop:"5%"}}
                onPress={()=>{

                  return this._addItem();

                }}
                >
                    <Text style={{fontSize:18,fontFamily:"Cairo_SemiBold" , color:"#fff"}}>
                    {i18n.t('add')}
                    </Text>
                  </TouchableOpacity>
              </View>
              
            </Content>
          </Container>
    
          )
        }
     
        return (
            <Container>
            <Header
            style={{backgroundColor:"green"}}
            androidStatusBarColor={"green"}
            >
              <Left>
                <Button transparent>
                  {/* <Icon name='wallet' /> */}
                  <MaterialIcons name={'menu'} size={30} style={{color:"#ffff"}} onPress={()=>{return this.props.navigation.openDrawer();}} />
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>{i18n.t('expencese')}</Title>
                </Body>
              <Right>
                <Button onPress={()=>{
                  this.setState({
                    isDialogVisible:true,
                  })
                }} transparent>
                <Octicons name='gear' size={24} style={{color:"#fff"}} />
                  {/* <Text style={{fontSize:20,fontFamily:"Cairo_Bold"}}>
                   Fri 01
                  </Text> */}

                </Button>
              </Right>
            </Header>
            <Content>
            <Text style={{marginLeft:"2%",marginTop:"2%",fontFamily: 'Cairo_SemiBold'}}>
                {i18n.t('today_expenses')}
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
                          ${this.state.today_expenses}
                        </Text>

                        <Text style={styles.card_data}>
                        {i18n.t('expencese_counter')}
                        </Text>

                  </View>

                </View>
               
              
                  <View style={{flex:1,alignItems:"center",justifyContent:"center",width:"50%"}}>

                    <View style={{flex:1,alignItems:"center"}}>

                        <Text style={styles.money_text}>
                          ${this.state.today_limit}
                        </Text>

                        <Text style={styles.card_data}>
                         {i18n.t('less_then')}
                        </Text>

                  </View>
                    
                  </View>
             

               
               
              
              </Body>

            </CardItem>
         </Card>
            

            <View style={{margin:"2%"}}>
                <Text style={{fontFamily: 'Cairo_SemiBold'}}>
                    {i18n.t('today_items_list')}
                </Text>
                <List>

                  {this.state.no_items ? (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                      <MaterialCommunityIcons name={"emoticon-happy-outline"} size={50} style={{color:"gray"}} />
                        <Text style={{fontFamily: 'Cairo_Regular',fontSize:14,color:"gray"}}>
                        {i18n.t('no_items')}
                        </Text>
                        <Text style={{fontFamily: 'Cairo_Regular',fontSize:14,color:"gray"}}>
                        {i18n.t('you_can_add')}
                        </Text>
                    </View>
                  )
                :(
                  this.state.items.map((item , index)=>{

                    return(
                     <ListItem key={item.id} avatar>
                     <Left>
                       {/* <Thumbnail source={{ uri: item.image }} /> */}
                       <Button style={{ backgroundColor: item.color , padding:25}}>
                         <FontAwesome5  name={item.icon} size={19} style={{color:"#fff"}} />
                     </Button>
                     </Left>
                     <Body>
                       <Text style={{fontFamily:"Cairo_SemiBold"}} >{ item.name }</Text>
                       <Text style={{fontFamily:"Cairo_SemiBold"}} note>{ item.note }</Text>
                     </Body>
                     <Right>
                       <Text note>${ item.price }</Text>
                       {/* <Text >X{ item.amout }</Text> */}
                       <TouchableOpacity onPress={()=>{this.setState({showAlert:true,chosen_item_index:index})}} ><Text><Icon size={1} name='trash' /></Text></TouchableOpacity>
                     </Right>
                   </ListItem>
                    )
                  })
                )}

                 
          </List>
            </View>
            

           <View style={{margin:"2%",marginLeft:"3%"}}> 
             

             
                <View style={{flex:1,flexDirection:"row"}}>
                <Text style={{fontFamily: 'Cairo_SemiBold',flex:1,alignSelf:"flex-start"}}>
                        {i18n.t('week_expencises')}
                </Text>
                <Text style={{fontFamily: 'Cairo_Regular',color:"gray",fontSize:14,marginLeft:"25%"}}>
                  {i18n.t('avg')}:${ this.state.avg_week_expeneces }
                </Text>
                </View>
              

             <Card>
             <LineChart
              data={{
                labels: ["Su", "Mo", "Tu", "We", "Th", "Fr","Sa"],
                datasets: [
                  {
                    data: this.state.week_expences,
                    color: (opacity = 2) => `rgba(0, 100, 0, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                  }
                ],
              }}
              yAxisLabel="$"
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />



            </Card>

            <View style={{flex:1,flexDirection:"row"}}>
                <Text style={{fontFamily: 'Cairo_SemiBold',flex:1,alignSelf:"flex-start"}}>
                        {i18n.t('where_expencise_go')}
                </Text>
                {/* <Text style={{fontFamily: 'Cairo_Regular',color:"gray",fontSize:14,marginLeft:"25%"}}>
                  {i18n.t('avg')}:${ this.state.avg_week_expeneces }
                </Text> */}
            </View>

          <Card style={{flexWrap:"wrap",flexDirection:"row" , padding:"5%"}}>

            {this.state.analytics ? (
              <View style={{marginRight:"5%",justifyContent:"center", alignItems:"center"}}>
                <AntDesign style={{fontSize:50,color:"gray"}} name={'inbox'} />
            <Text style={{fontFamily:"Cairo_SemiBold",color:"gray"}}>{ i18n.t('no_data_yet') }</Text>
              </View>
            ):(
             
             
              <PieChart outerRadius={"1%"} innerRadius={"100%"} animate={true} animationDuration={1000} style={{ height: 100  , width: "45%" }} data={pieData} />


              
            )}
            

                  <View style={{flex:1,flexWrap:"wrap"}}>
                    
                      <TouchableOpacity style={{margin:"2%",padding:5,backgroundColor:"orange",borderRadius:12,flexDirection:"row"}}>
                        <FontAwesome5  name={'pizza-slice'} size={12} style={{color:"#fff"}} />
                    <   Text style={{fontFamily:"Cairo_SemiBold",color:"#fff",fontSize:8,margin:"2%"}}> {i18n.t('food')}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{margin:"2%",padding:5,backgroundColor:"#3387ff",borderRadius:12,flexDirection:"row"}}>
                        <FontAwesome5  name={'bus-alt'} size={12} style={{color:"#fff"}} />
                        <Text style={{fontFamily:"Cairo_SemiBold",color:"#fff",fontSize:8,margin:"2%"}}> {i18n.t('transportation')}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{margin:"2%",padding:5,backgroundColor:"red",borderRadius:12,flexDirection:"row"}}>
                        <FontAwesome5  name={'bowling-ball'} size={12} style={{color:"#fff"}} />
                        <Text style={{fontFamily:"Cairo_SemiBold",color:"#fff",fontSize:8,margin:"2%"}}> {i18n.t('entertainment')}</Text>
                      </TouchableOpacity>
                    
                  </View>

                  <View>
                    
                    <Text style={{fontFamily:"Cairo_SemiBold",fontSize:12,color:"gray"}}>{i18n.t('transportation')}:</Text>
                    <Text style={{fontFamily:"Cairo_Bold",fontSize:12}}>${ this.state.overAll_transportationExpeneces }</Text>

                    <Text style={{fontFamily:"Cairo_SemiBold",fontSize:12,color:"gray"}}>{i18n.t('entertainment')}:</Text>
                    <Text style={{fontFamily:"Cairo_Bold",fontSize:12}}>${ this.state.overAll_entertainmentExpeneces }</Text>

                    <Text style={{fontFamily:"Cairo_SemiBold",fontSize:12,color:"gray"}}>{i18n.t('food')}:</Text>
                    <Text style={{fontFamily:"Cairo_Bold",fontSize:12}}>${ this.state.overAll_FoodExpeneces }</Text>


                  
                </View>



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

                <Content onPress={()=>{
                  this.setState({
                    cat_icon:"bowling-ball",
                    add_screen_title:"Entertainment",
                    new_item_icon:"bowling-ball",
                    add_item_screen:true,
                    new_item_color:"red",

                  })
                }} 
                style={{backgroundColor:"red"}}>
                        <FontAwesome5 name='bowling-ball' size={19} style={{color:"#fff"}} />
                </Content>
                
                <Content
                 onPress={()=>{
                  this.setState({
                    cat_icon:"pizza-slice",
                    add_screen_title:"Food",
                    new_item_icon:"pizza-slice",
                    new_item_color:"orange",
                    add_item_screen:true,
                  })
                }}
                style={{backgroundColor:"orange"}}>
                        <FontAwesome5 name='pizza-slice'  size={19} style={{color:"#fff"}} /> 
                </Content>


                <Content 
                onPress={()=>{
                  this.setState({
                    cat_icon:"bus-alt",
                    add_screen_title:"Transportation",
                    new_item_icon:"bus-alt",
                    new_item_color:"#3387ff",
                    add_item_screen:true,
                  })
                }} 
                style={{backgroundColor:"#3387ff"}}>
                        <FontAwesome5 name='bus-alt' size={19} style={{color:"#fff"}} /> 
                </Content>


            </Fab>


          <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={i18n.t('warning')}
          message={i18n.t('message')}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={i18n.t('cancelText')}
          confirmText={i18n.t('confirmText')}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
           this.setState({showAlert:false})
          }}
          onConfirmPressed={() => {
           return this._removeItem();
          }}
          titleStyle={{fontFamily:"Cairo_Bold"}}
          messageStyle={{fontFamily:"Cairo_Regular"}}
          cancelButtonTextStyle={{fontFamily:"Cairo_Regular"}}
          confirmButtonTextStyle={{fontFamily:"Cairo_Regular"}}
        />


      <DialogInput isDialogVisible={this.state.isDialogVisible}
                  title={i18n.t('important')}
                  message={i18n.t('message_add_budget')}
                  textInputProps={{
                    keyboardType:'numeric',
                  }}
                  hintInput ={i18n.t('ex')}
                  cancelText={i18n.t('cancel_expeneces')}
                  submitText={i18n.t('submit_expeneces')}
                  submitInput={ (inputText) => {
                   
                    return this._takeTodaylimit( inputText );

                  }
                }
                  closeDialog={ () => {this.setState({isDialogVisible:false})}}>
      </DialogInput>



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
