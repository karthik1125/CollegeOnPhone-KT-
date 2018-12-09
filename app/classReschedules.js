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

export default class ClassReschedules extends React.Component {
//   static propTypes = {
//     navigation: NavigationType.isRequired,
//   };
  static navigationOptions = {
    title: 'ClassReschedules'.toUpperCase(),
  };

  state = {
    data: undefined,
    url:'',
  };

  extractItemKey = (item) => `${item.slno}`;

  onItemPressed = (item) => {
    //this.props.navigation.navigate('Article', { id: item.id });
  };
  cardData = (data) =>{
      //console.log("data",data.data);
      this.setState({data:data.data.reverse()});
  }

  _retrieveData2 =async(value) => {
    try {
        const value2 =  await AsyncStorage.getItem('data');
        if(value2 !==null){
            let self=this;
            let data2 = JSON.parse(value2);
            console.log(data2,"asdafkljgkhiwe")
            console.log(data2.student,'asdasdasdasdasda2')
            // console.log(value2["student"]["Student_ID"],'asdasdasdasdasda1')
            // console.log(value2["student"][0],'asdasdasdasdasda2')
            // console.log(value2["student"][0]["Student_ID"],'asdasdasdasdasda3')
            let body ={
                'stu_id':'S'+String(data2.student[0]["Student_ID"])
            }
            console.log("sid",body);
    
            console.log("inside callAPI");

            axios({method:"post",url:`${value}/api/post_get_mix_mapper_classreschedules_course/`,data:[body]}).then(res =>{
                    console.log("response status of classReschedules",res.data);
                    self.cardData(res);
              });

          //   axios.post(`${value}/api/post_get_mix_mapper_preclassreq_course/`,body).then(res =>{
          //       console.log("response status of preClassReq",res.data);
          //      // self.cardData(res);
          // });
    
        //      axios({method:'post',
        //       url:`${value}/api/post_get_mix_mapper_preclassreq_course/`,
        //       data:[body]  }).then(res =>{
        //         console.log("response status",res.data);
        //        // self.cardData(res);
        //   });
        }
     } catch (error) {
       // Error retrieving data
       console.log("error in retrieval of post");
     }
  }

  callApi = (value) => {
      this._retrieveData2(value);
   
  }
  _retrieveData =async() => {
    try {
      const value = await AsyncStorage.getItem('api');
      if (value !== null) {
          //console.log(data2);
          //console.log('url',`${value}/api/events/`);
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
      onPress={() => this.onItemPressed(item)}>
      <RkCard rkType='blog' style={styles.card}>
        {/* <Image rkCardImg source={item.photo} /> */}
        <View rkCardHeader style={styles.content}>
          <RkText style={styles.section} rkType='header3'>{item.course_name}</RkText>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='primary3 mediumLine' numberOfLines={3}>{item.description}</RkText>
            <RkText style={styles.section} rkType='header4'>Update</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>New Time : {item.new_time}</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>New Date : {item.new_date}</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>New Room : {item.new_room}</RkText>
            <RkText style={styles.section} rkType='header4'>Previously</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>Old Time : {item.old_time}</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>Old Date : {item.old_date}</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>Old Room : {String(item.old_room)}</RkText>
          </View>
        </View>
        <View rkCardFooter>
          <View style={styles.userInfo}>
            <Avatar style={styles.avatar} rkType='circle small' img={logo} />
            {/* <RkText rkType='header6'>{`${item.event_type}`}</RkText> */}
          </View>
          <RkText rkType='secondary2 hintColor'>{item.post_time}</RkText>
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

  render = () => (
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
    <FlatList
      data={this.state.data}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.container}
    />
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
