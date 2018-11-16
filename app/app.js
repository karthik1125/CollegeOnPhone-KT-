import React from 'react';
import { View } from 'react-native';
import { AsyncStorage } from "react-native"
import {
  AppLoading,
  Font,
} from 'expo';
import {
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { AppRoutes } from './config/navigation/routesBuilder';
import * as Screens from './screens';
import { bootstrap } from './config/bootstrap';
import track from './config/analytics';
import { data } from './data';
import WebViewExample from './web_view_example';
import Test from './test';
const axios = require('axios');

bootstrap();
data.populateData();

let token = '';

const KittenApp = createStackNavigator({

  First: {

    screen: Screens.SplashScreen,

  },

  Home: {

    screen: createDrawerNavigator(

      {

        ...AppRoutes,

      },

      {

        contentComponent: (props) => {

          const SideMenu = withRkTheme(Screens.SideMenu);

          return <SideMenu {...props} />;

        },

      },

    ),

  },

}, {

  headerMode: 'none',

});
export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('data',JSON.stringify(data));
    } catch (error) {
      console.log("error in storing");
    }
    try{
      await AsyncStorage.setItem('api',"http://10.0.52.19:8000");
    }catch(error){
      console.log("error in api url storing");
    }
  }

  returnFunction = (value)=>{
    token = value;
    let data = undefined;
    //console.log("tokennnnnnnnnnnnnnnnnnn",token);
    let self=this;
            let Payload = {'token':value , 'secret':"33414cc05a159b68a01b193903fdb5bc1fcfc53c3a435926d53c5ea80e22ad514eeb637374f185613fc17498f4e931d62dd0307e5540d521a0a3ae64717ab57b"}
            axios.post("https://serene-wildwood-35121.herokuapp.com/oauth/getDetails",Payload 
            ).then(res => {
                console.log(res.data.student[0]["Student_Last_name"]);
                data = res.data;
                //console.log(data);
                self._storeData(data);
                //this.setState({lastName:res.data.student[0]["Student_Last_name"]})
              })      

    
    this.setState({isLoaded:true});
  }

  componentWillMount() {
    this.loadAssets();
  }

  onNavigationStateChange = (previous, current) => {
    const screen = {
      current: this.getCurrentRouteName(current),
      previous: this.getCurrentRouteName(previous),
    };
    if (screen.previous !== screen.current) {
      track(screen.current);
    }
  };

  getCurrentRouteName = (navigation) => {
    const route = navigation.routes[navigation.index];
    return route.routes ? this.getCurrentRouteName(route) : route.routeName;
  };

  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require('./assets/fonts/fontawesome.ttf'),
      icomoon: require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({ isLoaded: true });
  };

  renderLoading = () => (
    <AppLoading />
  );

  renderApp = () => (
    <View style={{ flex: 1 }}>
    
       {(token == '') 
      ?(<WebViewExample returnFunction={this.returnFunction}/>)
      :(<KittenApp onNavigationStateChange={this.onNavigationStateChange} />)
    } 
      
    </View>
  );

  render = () => (this.state.isLoaded ? this.renderApp() : this.renderLoading());
}

Expo.registerRootComponent(App);
