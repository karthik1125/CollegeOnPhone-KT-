import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Picker,
  Text
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText,
  RkButton,
  
} from 'react-native-ui-kitten';
import { AsyncStorage } from "react-native"
import { Avatar } from './components';
import { data } from './data';
import NavigationType from './config/navigation/propTypes';
import logo from './assets/images/logo.png';
// import { Dropdown } from 'react-native-material-dropdown';

const moment = require('moment');
const axios = require('axios');
console.disableYellowBox = true;

var slot_timings =["","9:00AM - 10:00AM","10:00AM - 11:00AM", "11:00AM - 11:15AM", "11:15AM - 12:15PM",
   "12:15PM - 1:15PM", "1:15PM - 1:30PM","1:30PM - 2:30PM","2:30PM - 3:30PM","3:30PM - 4:30PM","4:30PM - 5:30PM","5:30PM - 6:30PM",]

export default class TimeTable extends React.Component {
//   static propTypes = {
//     navigation: NavigationType.isRequired,
//   };
  static navigationOptions = {
    title: 'TimeTable'.toUpperCase(),
  };

  state = {
    data: [],
    url:'',
    coursePick:'ASE',
    courses:["DM","TOC","DMPT","DIP","PC","IR","decr","OC","CommSkills_1","CommSkills_3","Maths_3","Algo","DSAA","OS","DE","IOT","EMT","MERS","CSD","DigiComm","APS","ASE_1","STATS",
    "GE","LS","VLSI","YW","ASE_11","FA","APT"       
            ],
    days : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    slots :[1,2,3,4,5,6,7,8,9,10,11],
    class_types : ["","sec A","sec B","sec A - lab","sec B - lab", "sec C - lab","sec A - tut", "sec B - tut","",""],
    temp2:false,
    final_array :[],
    array:[],
   
  };

  extractItemKey = (item) => `${item.slno}`;

  onItemPressed = (item) => {
    //this.props.navigation.navigate('Article', { id: item.id });
  };
  cardData = (data) =>{
      //console.log("data",data.data);
      console.log("Length",data.data[0]["c_name"]);
      let final = [];
      let k=0;
      for(let i=0; i<data.data.length;i++){
        if(data.data[i]["c_name"]===this.state.coursePick){
            final.push(data.data[i]);
            final[k]["slot_time"] = slot_timings[final[k]["slot_no"]];
            final[k]["class_type_name"] = this.state.class_types[final[k]["class_type"]];
            k+=1;
        }
      }
      this.setState({final_array:final});
    
  }
  callApi = () => {
    let self=this;
    let temp =  [{"Monday": "-",'Tuesday':"-",'Wednesday':"-",'Thursday':"-",'Friday':"-",'Saturday':"-"} ];
    this.setState({final_array:temp});
    console.log("inside callAPI");
     axios.get(`http://10.0.49.5:8010/timetableNew/`).then(res => {
        console.log("response status",res.status);
        self.cardData(res);
      })
  }
//   _retrieveData =async() => {
//     try {
//       const value = await AsyncStorage.getItem('api');
//       if (value !== null) {
//           //console.log(data2);
//           console.log('url',`${value}/api/events/`);
//           this.callApi(value);
//       }
//      } catch (error) {
//        // Error retrieving data
//        console.log("error in retrieval of url");
//      }
//   }
handlePress(itemValue){
  this.setState({temp2:true});
  this.setState({coursePick:itemValue});
  this.callApi();
}

  componentWillMount(){
    //this._retrieveData();
    console.log("Entered Timetable")
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.onItemPressed(item)}>
      <RkCard rkType='blog' style={styles.card}>
        
        <View rkCardHeader style={styles.content}>
          <RkText style={styles.section} rkType='header3'>{item["day"]}</RkText>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='header4' numberOfLines={3}>{item["c_name"]}</RkText>
            <RkText rkType='primary3 mediumLine' numberOfLines={3}>{item["class_type_name"]}</RkText>
            <RkText rkType='primary3 mediumLine' numberOfLines={3}>{item["slot_time"]}</RkText>
            <RkText rkType='primary3 mediumLine' numberOfLines={3}>{String(item["rid"])}</RkText>
          </View>
        </View>
        <View rkCardFooter>
          <View style={styles.userInfo}>
            <Avatar style={styles.avatar} rkType='circle small' img={logo} />
          </View>
        </View>
      </RkCard>
    </TouchableOpacity>

//     <TouchableOpacity
//     delayPressIn={70}
//     activeOpacity={0.8}
//     //onPress={() => this.onItemPressed(item)}
//     >
//     <RkCard rkType='blog' style={styles.card}>
//       {/* <Image rkCardImg source={item.photo} /> */}
//       <View rkCardHeader style={styles.content}>
//         <RkText style={styles.section} rkType='header4'>"NSS Event"</RkText>
//       </View>
//       <View rkCardContent>
//         <View>
//           <RkText rkType='primary3 mediumLine' numberOfLines={2}>"There will be a swacch Bharat Run"</RkText>
//         </View>
//       </View>
//       <View rkCardFooter>
//         <View style={styles.userInfo}>
//           {/* <Avatar style={styles.avatar} rkType='circle small' img={item.user.photo} /> */}
//           {/* <RkText rkType='header6'>{`${item.user.firstName} ${item.user.lastName}`}</RkText> */}
//         </View>
//         {/* <RkText rkType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</RkText> */}
//       </View>
//     </RkCard>
//   </TouchableOpacity>
  );

  render(){
    let drop_down_options=[];
    for(let i=0;i<this.state.courses.length;i++){
      drop_down_options.push( <Picker.Item key={i+this.state.courses[i]} label={this.state.courses[i]} value={this.state.courses[i]} />);
    }
    return( <View>
      <Picker 
      selectedValue={this.state.coursePick}
      style={{ alignItems: 'flex-end', width:'50%' }}
      onValueChange={(itemValue, itemIndex) => this.handlePress(itemValue) }>
      {drop_down_options}
      </Picker>
     
      {this.state.temp2 
      ?(<FlatList
        data={this.state.final_array}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}  
        style={styles.container}
            />)
       :(null)
      }
      
    </View>);
     

//     <TouchableOpacity
//     delayPressIn={70}
//     activeOpacity={0.8}
//     // onPress={() => this.onItemPressed(item)}
//     >
//     <RkCard rkType='blog' style={styles.card}>
//       {/* <Image rkCardImg source={item.photo} /> */}
//       <View rkCardHeader style={styles.content}>
//         <RkText style={styles.section} rkType='header4'>"NSS Event"</RkText>
//       </View>
//       <View rkCardContent>
//         <View>
//           <RkText rkType='primary3 mediumLine' numberOfLines={2}>"There will be a swacch Bharat Run"</RkText>
//         </View>
//       </View>
//       <View rkCardFooter>
//         <View style={styles.userInfo}>
//           {/* <Avatar style={styles.avatar} rkType='circle small' img={item.user.photo} /> */}
//           {/* <RkText rkType='header6'>{`${item.user.firstName} ${item.user.lastName}`}</RkText> */}
//         </View>
//         {/* <RkText rkType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</RkText> */}
//       </View>
//     </RkCard>
//   </TouchableOpacity>
   
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
