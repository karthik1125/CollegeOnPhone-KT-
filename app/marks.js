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
console.disableYellowBox = true;

export default class Marks extends React.Component {
//   static propTypes = {
//     navigation: NavigationType.isRequired,
//   };
  static navigationOptions = {
    title: 'Marks'.toUpperCase(),
  };

  state = {
    data: undefined,
    url:'',
  };

  extractItemKey = (item) => `${item.slno}`;

  onItemPressed = (item) => {
    //this.props.navigation.navigate('Article', { id: item.id });
  };
  cardData = (data,roll) =>{
      let tempMarks =[];
        for(let i=0; i<data.data.length;i++){
            if(data.data[i]["Student_Id"] == roll){
                tempMarks.push(data.data[i]);
            }
        }
      //console.log("data",data.data);
      this.setState({data:tempMarks});
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

            axios({method:"get",url:"http://10.0.49.5:8010/sendmarks/"}).then(res =>{
                    console.log("response status of preClassReq",res.data);
                    self.cardData(res,String(data2.student[0]["Student_ID"]));
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
          <RkText style={styles.section} rkType='header3'>{item.Academic_Course_Id}</RkText>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='primary3 mediumLine' numberOfLines={3}>Weightage: {item.Marks_perc}</RkText>
            <RkText style={styles.section} rkType='primary3 mediumLine'>Marks: {item.Marks}</RkText>
          </View>
        </View>
        <View rkCardFooter>
          <View style={styles.userInfo}>
            <Avatar style={styles.avatar} rkType='circle small' img={logo} />
            {/* <RkText rkType='header6'>{`${item.event_type}`}</RkText> */}
          </View>
          <RkText rkType='secondary2 hintColor'>{item.Exam_Type}</RkText>
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
