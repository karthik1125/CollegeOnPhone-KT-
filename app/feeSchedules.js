import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten';
import { AsyncStorage } from "react-native"
import { Avatar } from './components';
import { data } from './data';
import NavigationType from './config/navigation/propTypes';
import logo from './assets/images/logo.png';

const moment = require('moment');
const axios = require('axios');


export default class FeeSchedules extends React.Component {

  static navigationOptions = {
    title: 'Fee Schedules'.toUpperCase(),
  };

  state = {
    data: undefined,
    url:'',
    temp:false,
  };

  extractItemKey = (item) => `${item.slno}`;

  onItemPressed = (item) => {
    //this.props.navigation.navigate('Article', { id: item.id });
  };
  cardData = (data) =>{
      //console.log("data",data.data);
      this.setState({data:data.data.reverse(),temp:true});
  }
  callApi = async(value) => {
    let self=this;
    console.log("inside callAPI");
     await axios.get(`${value}/api/feeschedules/`).then(res => {
        console.log("response status",res.status);
        self.cardData(res);
      })
  }
  _retrieveData =async() => {
    try {
      const value = await AsyncStorage.getItem('api');
      if (value !== null) {
          //console.log(data2);
          console.log('url',`${value}/api/feeschedules/`);
          this.callApi(value);
      }
     } catch (error) {
       // Error retrieving data
       console.log("error in retrieval of url");
     }
  }

  componentWillMount(){
    this._retrieveData();
  }

  renderItem = ({ item }) => (
    
    <TouchableOpacity
    delayPressIn={70}
    activeOpacity={0.8}
    onPress={() => self.onItemPressed(item)}>
    <RkCard rkType='blog' style={styles.card}>
      {/* <Image rkCardImg source={item.photo} /> */}
      <View rkCardHeader style={styles.content}>
        <RkText style={styles.section} rkType='header3'>{item["title"]}</RkText>
      </View>
      <View rkCardContent>
        <View>
          <RkText rkType='primary3 mediumLine' numberOfLines={3}>{item["description"]}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Due Date : {item["due_date"]}</RkText>
          {/* <RkText style={styles.section} rkType='header4'>Update :</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Time : {item.new_time}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Date : {item.new_date}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Room : {item.new_room}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Previously:</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Time : {item.old_time}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Date : {item.old_date}</RkText>
          <RkText style={styles.section} rkType='primary3 mediumLine'>Room : {item.old_room}</RkText> */}

        </View>
      </View>
      <View rkCardFooter>
        <View style={styles.userInfo}>
          <Avatar style={styles.avatar} rkType='circle small' img={logo} />
        </View>
        <RkText rkType='secondary2 hintColor'>{item["studentdegree"]}</RkText>
      </View>
    </RkCard>
  </TouchableOpacity>

//   
  );
  // render(){
  //   let self=this;
  //   return(
  //     <View>
  //       {self.state.data 
  //       ? (<View>
  //         {self.state.data.map(function(x,i){
  //           {console.log(self.state.data[i]["description"])}
  //         <TouchableOpacity
  //         delayPressIn={70}
  //         activeOpacity={0.8}
  //         onPress={() => self.onItemPressed(self.state.data[i])}>
  //         <RkCard rkType='blog' style={styles.card}>
  //           {/* <Image rkCardImg source={item.photo} /> */}
  //           <View rkCardHeader style={styles.content}>
  //             <RkText style={styles.section} rkType='header3'>{self.state.data[i]["title  "]}</RkText>
  //           </View>
  //           <View rkCardContent>
  //             <View>
  //               <RkText rkType='primary3 mediumLine' numberOfLines={3}>{self.state.data[i]["description"]}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Due Date : {self.state.data[i]["due_date"]}</RkText>
  //               {/* <RkText style={styles.section} rkType='header4'>Update :</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Time : {item.new_time}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Date : {item.new_date}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Room : {item.new_room}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Previously:</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Time : {item.old_time}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Date : {item.old_date}</RkText>
  //               <RkText style={styles.section} rkType='primary3 mediumLine'>Room : {item.old_room}</RkText> */}
    
  //             </View>
  //           </View>
  //           <View rkCardFooter>
  //             <View style={styles.userInfo}>
  //               <Avatar style={styles.avatar} rkType='circle small' img={logo} />
  //             </View>
  //             <RkText rkType='secondary2 hintColor'>{self.state.data[i]["studentdegree"]}</RkText>
  //           </View>
  //         </RkCard>
  //       </TouchableOpacity>
    
  //       })}
  //       </View>)
  //       : (<RkText>Loading</RkText>)
  //       }
        
  //     </View>
  //   );
  // }

  render = () => (
    <View>
      {this.state.data ?(<FlatList
      data={this.state.data}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.container}
    />):(<RkText>Loading</RkText>)}
    </View>
    
  );
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
