import React from 'react';
import {
    View,
    ScrollView,
    Text,
  } from 'react-native';
  import { AsyncStorage } from "react-native"
  import {
    RkText,
    RkButton, RkStyleSheet,
  } from 'react-native-ui-kitten';
  import { Avatar } from './components/avatar';
  import { Gallery } from './components/gallery';
  import { data } from './data/';
  import formatNumber from './utils/textUtils';
  import NavigationType from './config/navigation/propTypes';
  import logo from './assets/images/logo.png';

  const axios = require('axios');
  
export default class Test extends React.Component{
    // static propTypes = {
    //     navigation: NavigationType.isRequired,
    //   };
      static navigationOptions = {
        title: 'User Profile'.toUpperCase(),
      };
      _retrieveData =async() => {
        try {
          const value = await AsyncStorage.getItem('data');
          if (value !== null) {
              let data2 = JSON.parse(value);
              //console.log(data2);
            this.setState({data:data2,isLoading:false});
               
          }
         } catch (error) {
           // Error retrieving data
           console.log("error in retrieve");
         }
      }
      constructor(props) {
        super(props);
        // const id = this.props.navigation.getParam('id', 1);
        // this.state.data = data.getUser(id);
        this.state = {
            data:undefined,
            isLoading:true,
        }

      }
      componentWillMount(){
          this._retrieveData();
      }
    //   componentWillUnmount() {
    //     this.isCancelled = true;
    //     this.forceUpdate();
    // }
    //   componentDidUpdate(){
    //       this.setState({temp:true});
    //   }
    
      render = () => (
        //   <View>
        //       {(this.state.data != undefined)
        //         ?(<ProfileExt studentLastName={this.state.data.student[0]["Student_Last_name"]} stduentFirstName={this.state.data.student[0]["Student_First_name"]} studentID={this.state.data.student[0]["Student_ID"]}/>)
        //         :(<ProfileExt studentLastName="loading2" stduentFirstName="loading2" studentID="loading2"/>)
        //     }
              
        //   </View>
            

            <ScrollView style={styles.root}><Text>{"\n\n\n\n"}</Text>
            {this.state.isLoading 
            ?(<View><Text>Loading</Text></View>) 
            :(<View style={[styles.header, styles.bordered]}>
                <Avatar img={logo} rkType='big' />
                
                <RkText rkType='header2'>{`${this.state.data.student[0]["Student_Last_name"]} ${this.state.data.student[0]["Student_First_Name"]}`}</RkText>
                <Text>{"\n"}</Text>
                <RkText rkType='primary3 mediumLine'>Roll NO:{`${this.state.data.student[0]["Student_ID"]} `}</RkText>
                <Text>{"\n"}</Text>
                <View style={styles.buttons}>
               <RkButton style={styles.button} rkType='clear link'>Log Out</RkButton>
                </View>
              </View>
              )
            }
            
  
            {/* <View style={[styles.userInfo, styles.bordered]}>
              <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{this.state.data.postCount}</RkText>
                <RkText rkType='secondary1 hintColor'>Posts</RkText>
              </View> */}
              {/* <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{formatNumber(this.state.data.followersCount)}</RkText>
                <RkText rkType='secondary1 hintColor'>Followers</RkText>
              </View> */}
              {/* <View style={styles.section}>
                <RkText rkType='header3' style={styles.space}>{this.state.data.followingCount}</RkText>
                <RkText rkType='secondary1 hintColor'>Following</RkText>
              </View> */}
            {/* </View> */}
           
            {/* <Gallery items={this.state.data.images} /> */}
            </ScrollView>
      );
}

const styles = RkStyleSheet.create(theme => ({
    root: {
      backgroundColor: theme.colors.screen.base,
    },
    header: {
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 17,
    },
    userInfo: {
      flexDirection: 'row',
      paddingVertical: 18,
    },
    bordered: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border.base,
    },
    section: {
      flex: 1,
      alignItems: 'center',
    },
    space: {
      marginBottom: 3,
    },
    separator: {
      backgroundColor: theme.colors.border.base,
      alignSelf: 'center',
      flexDirection: 'row',
      flex: 0,
      width: 1,
      height: 42,
    },
    buttons: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    button: {
      flex: 1,
      alignSelf: 'center',
    },
  }));

