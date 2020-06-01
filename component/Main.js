import React from 'react';
import { AppLoading } from 'expo';
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
   Thumbnail , 
   Fab , 
   Form , 
   Item , 
   Label , 
   Input ,
   Textarea,
   

  } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons , FontAwesome5 , MaterialCommunityIcons , Octicons} from '@expo/vector-icons';
import { StyleSheet , View , Dimensions , TouchableOpacity , AsyncStorage } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SwipeListView } from 'react-native-swipe-list-view'; /** Delete this packiage */
import AwesomeAlert from 'react-native-awesome-alerts';
import DialogInput from 'react-native-dialog-input';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


const screenWidth = Dimensions.get("window").width/1.1;


const data = {
  labels: ["Su", "Mo", "Tu", "We", "Th", "Fr","Sa"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43 , 5],
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

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { 
   back: 'Back',
   name: 'Name' ,
   note: 'Note',
   price: 'Price',
   add: 'Add',
   expencese: 'Expencese',
   today_expenses: 'Today Expencise',
   expencese_counter:'Expencese',
   less_then:'Less then',
   today_items_list:'Today Items List',
   no_items:'You Have No items Today',
   you_can_add:'You Can Add Throw the Plus Sign',
   week_expencises:'Week Expencises',
   warning:"Warning!",
   message:"are you sure you want to delete this item ?",
   cancelText:"No, cancel",
   confirmText:"Yes, delete it",
   important:'Important!',
   message_add_budget:'Please Add Your Daly Budget',
   ex:"ex.50",
   submit:"SUBMIT",
   cancel:"CANCEL",
   avg:"avg daily exp",


  },
  ar: {
   back: 'رجوع',
   name: 'عنوان' ,
   note: 'ملاحظه',
   price: 'السعر',
   add: 'اضافة',
   expencese: 'التكاليف',
   today_expenses: 'تكالييف اليوم',
   expencese_counter:'التكاليف',
   less_then:'مصروف اليوم',
   today_items_list:'قائمة تكاليف اليوم',
   no_items:'لا يوجد اي عنصر اليوم',
   you_can_add:'بمكانك اضافة عنصر جديد عن طريق علامة الزائد',
   week_expencises:'تكاليف الاسبوع',
   warning:"تحذير!",
   message:"هل تريد حذف العنصر ؟",
   cancelText:"لأ , اريد الالغاء",
   confirmText:"نعم , اريد",
   important:'مهم',
   message_add_budget:'الرجاء اضافة ميزانتك اليوميه',
   ex:"مثال.50",
   submit:"اضافة",
   cancel:"الغاء",
   avg:"متوسط صرفك",
  },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;




class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          active:false,
          items:[
            // {"id":1,"image":"https://images-na.ssl-images-amazon.com/images/I/81MwSzttarL._SL1500_.jpg",'name':"tuna",'note':"bring 10 cans of tuna please :)","price":50,'amout':10,"icon":"pizza-slice","color":"orange"},
            // {"id":2,"image":"https://hips.hearstapps.com/vidthumb/images/delish-u-rice-2-1529079587.jpg",'name':"Rice",'note':"Bring 10KGs of Rice","price":70,'amout':1,"icon":"pizza-slice","color":"orange"},
            // {"id":3,"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/661px-Red_Apple.jpg",'name':"رايح على الجيم",'note':"Bring 1Kg of Apples","price":5,'amout':1,"icon":"bus-alt","color":"#3387ff"},
            // {"id":4,"image":"https://images-na.ssl-images-amazon.com/images/I/71qyzy9QnML._SL1500_.jpg",'name':"Oats ",'note':"One Can of Oats","price":15,'amout':5,"icon":"pizza-slice","color":"orange"},
            // {"id":5,"image":"https://images-na.ssl-images-amazon.com/images/I/71xnxlsfqOL._AC_SX425_.jpg",'name':"Protien ",'note':"ON Marka","price":25,'amout':1,"icon":"pizza-slice","color":"orange"},
            // {"id":6,"image":"https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg",'name':"احظر فلم قوي ",'note':"4 Pices of Pasta","price":20,'amout':4,"icon":"bowling-ball","color":"red"},
            // {"id":7,"image":"https://static.webteb.net/images/content/ramadanrecipe_recipe_5_719.jpg",'name':"ملوخيه ",'note':"اربعه كيلو","price":25,'amout':4,"icon":"pizza-slice","color":"orange"},
        ],
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

        
        };
      }
     
      async componentDidMount() {

          // Load the fonts
          await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Cairo_Black: require('../assets/fonts/Cairo_Black.ttf'),
            Cairo_Regular: require('../assets/fonts/Cairo-Regular.ttf'),
            Cairo_Bold: require('../assets/fonts/Cairo-Bold.ttf'),
            Cairo_SemiBold: require('../assets/fonts/Cairo-SemiBold.ttf'),




            
            
            ...Ionicons.font,
          });

          // create user info 

          let user_limit = await AsyncStorage.getItem('user_limit');
          let today_is = await AsyncStorage.getItem('day');
         // let today_is = 5;
          let yester_day_expences = await AsyncStorage.getItem('yesterday_expence');
          let check_week_data = await AsyncStorage.getItem('week');

          var days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
          var d = new Date();
        //  alert(d.getDay());
        // this.setState({todayis:days[d.getDay()]})
        
        /**
         * check the day if we are not in the same day save expenese and  delete all data
         * if this is the first time the user opend the app create new week expences with
         * 0 value to every day
         */
        let day_expences;
        if(today_is != null && check_week_data != null )
        {

         // alert(d.getDay()); 

          if(days[d.getDay()] != days[today_is]) 
          {

            

            try {
              const week_data = await AsyncStorage.getItem('week');
              const days_data = JSON.parse(week_data); // this is how you get back the array stored
              
             
              
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
            
           AsyncStorage.setItem('items',JSON.stringify([]));

             this.setState({
              items:[]
            })
          }
        
      
        
        // check if there is any items to wther or not show the no items message 
          if(this.state.items.length > 0)
          {
            this.setState({
              no_items:false
            })
          }
          
        // add the new values to the state  
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

        // check the limit if it's above it change the number color to red    
            if(this.state.today_limit < this.state.today_expenses)
            {
              return this.setState({
                above_limit:"red"
              })
            } 
        


      }

      _removeItem = ()=>{
       
        let items_array = this.state.items;
        let index = this.state.chosen_item_index;
        let get_all_prices = [];
        const check_item = items_array.indexOf(index)
        let color;
       
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



          return this.setState({above_limit:color})
        }
      }

      _addItem = async () => {

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

        return this.setState({
          above_limit:color,
          week_expences:this.state.week_expences
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
     
      render() {

        if (!this.state.isReady) {
          return <AppLoading />;
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
                  <FontAwesome5 name='angle-left' size={24} style={{color:"#fff"}} />
                </Button>
              </Left>
              <Body>
                <Title style={{fontSize:18,fontFamily: 'Cairo_Black'}}>{i18n.t('back')}</Title>
              </Body>
              <Right>
                <Button  transparent>
                  <Icon name='menu' />
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
                  <Icon name='wallet' />
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
                        {this.state.today_expenses}$
                        </Text>

                        <Text style={styles.card_data}>
                        {i18n.t('expencese_counter')}
                        </Text>

                  </View>

                </View>
               
              
                  <View style={{flex:1,alignItems:"center",justifyContent:"center",width:"50%"}}>

                    <View style={{flex:1,alignItems:"center"}}>

                        <Text style={styles.money_text}>
                          {this.state.today_limit}$
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
                       <Text note>{ item.price }$</Text>
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
                  {i18n.t('avg')}:{ this.state.avg_week_expeneces }$
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
           this._removeItem()
          }}
          titleStyle={{fontFamily:"Cairo_Bold"}}
          messageStyle={{fontFamily:"Cairo_Regular"}}
          cancelButtonTextStyle={{fontFamily:"Cairo_Regular"}}
          confirmButtonTextStyle={{fontFamily:"Cairo_Regular"}}
        />

      <DialogInput isDialogVisible={this.state.isDialogVisible}
                  title={i18n.t('important')}
                  message={i18n.t('message_add_budget')}
                  hintInput ={i18n.t('ex')}
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
