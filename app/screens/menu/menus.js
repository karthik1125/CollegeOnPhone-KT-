/* eslint-disable react/no-multi-comp */
import React from 'react';
import Text from 'react-native';

import { CategoryMenu } from './categoryMenu';
import * as Routes from '../../config/navigation/routesBuilder';
import NavigationType from '../../config/navigation/propTypes';

import Profile from '../../profile.js';
import Events from '../../events';
import ClassReschedules from '../../classReschedules';
import PreClassReq from '../../preClassReq';
import FeeSchedules from '../../feeSchedules';
import AssignPro from '../../assignments';
import TimeTable from '../../timetable';
import Marks from '../../marks';


export class NavigationMenu extends React.Component {
 
  static navigationOptions = {
    title: 'Marks'.toUpperCase(),
  };
  render(){
    return(<Marks />);
  }
}

export class SocialMenu extends React.Component {
  static navigationOptions = {
    title: 'Profile'.toUpperCase(),
  };
  render(){
    return(<Profile />);
  }
}

export class ArticleMenu extends React.Component {
  static navigationOptions = {
    title: 'Events'.toUpperCase(),
  };
  render(){
    return(<Events />);
  }
}

export class MessagingMenu extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Class Reschedules'.toUpperCase(),
  };
  render(){
    return(<ClassReschedules />);
  }
}

export class DashboardMenu extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Timetable'.toUpperCase(),
  };
  render(){
    return(<TimeTable />);
  }
}

export class WalkthroughMenu extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Pre-Class Requirements'.toUpperCase(),
  };
  render(){
    return(<PreClassReq />);
  }
}

export class EcommerceMenu extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Fee Schedules'.toUpperCase(),
  };
  render(){
    return(<FeeSchedules />);
  }
}

export class OtherMenu extends React.Component {
  // static propTypes = {
  //   navigation: NavigationType.isRequired,
  // };
  static navigationOptions = {
    title: 'Assignments/Projects'.toUpperCase(),
  };
  render(){
    return(<AssignPro />);
  }
}
