import _ from 'lodash';
import { FontIcons } from '../../assets/icons';
import * as Screens from '../../screens/index';

export const MainRoutes = [
  {
    id: 'SocialMenu',
    title: 'Profile',
    icon: FontIcons.profile,
    screen: Screens.SocialMenu,
    children: [
      {
        id: 'ProfileV1',
        title: 'User Profile V1',
        screen: Screens.ProfileV1,
        children: [],
      },
      {
        id: 'ProfileV2',
        title: 'User Profile V2',
        screen: Screens.ProfileV2,
        children: [],
      },
      {
        id: 'ProfileV3',
        title: 'User Profile V3',
        screen: Screens.ProfileV3,
        children: [],
      },
      {
        id: 'ProfileSettings',
        title: 'Profile Settings',
        screen: Screens.ProfileSettings,
        children: [],
      },
      {
        id: 'Notifications',
        title: 'Notifications',
        screen: Screens.Notifications,
        children: [],
      },
      {
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: [],
      },
      {
        id: 'Feed',
        title: 'Feed',
        screen: Screens.Feed,
        children: [],
      },
    ],
  },
  {
    id: 'ArticlesMenu',
    title: 'Events',
    icon: FontIcons.article,
    screen: Screens.ArticleMenu,
    children: [
      {
        id: 'Blogposts',
        title: 'Blogposts',
        screen: Screens.Blogposts,
        children: [],
      },
    ],
  },
  {
    id: 'MessagingMenu',
    title: 'Class Reschedules',
    icon: FontIcons.mail,
    screen: Screens.MessagingMenu,
    children: [
      {
        id: 'Chat',
        title: 'Chat',
        screen: Screens.Chat,
        children: [],
      },
      {
        id: 'ChatList',
        title: 'Chat List',
        screen: Screens.ChatList,
        children: [],
      },
      {
        id: 'Comments',
        title: 'Comments',
        screen: Screens.Comments,
        children: [],
      },
    ],
  },
  {
    id: 'DashboardsMenu',
    title: 'Timetable',
    icon: FontIcons.dashboard,
    screen: Screens.DashboardMenu,
    children: [{
      id: 'Dashboard',
      title: 'Dashboard',
      screen: Screens.Dashboard,
      children: [],
    }],
  },
  {
    id: 'WalkthroughMenu',
    title: 'Pre-Class Requirements',
    icon: FontIcons.mobile,
    screen: Screens.WalkthroughMenu,
    children: [{
      id: 'Walkthrough',
      title: 'Walkthrough',
      screen: Screens.WalkthroughScreen,
      children: [],
    }],
  },
  {
    id: 'EcommerceMenu',
    title: 'Fee Schedules',
    icon: FontIcons.card,
    screen: Screens.EcommerceMenu,
    children: [
      {
        id: 'Cards',
        title: 'Cards',
        icon: FontIcons.card,
        screen: Screens.Cards,
        children: [],
      },
      {
        id: 'AddToCardForm',
        title: 'Add Card Form',
        icon: FontIcons.addToCardForm,
        screen: Screens.AddToCardForm,
        children: [],
      },

    ],
  },
  {
    id: 'NavigationMenu',
    icon: FontIcons.navigation,
    title: 'Marks',
    screen: Screens.NavigationMenu,
    children: [
      {
        id: 'GridV1',
        title: 'Grid Menu V1',
        screen: Screens.GridV1,
        children: [],
      },
      {
        id: 'GridV2',
        title: 'Grid Menu V2',
        screen: Screens.GridV2,
        children: [],
      },
      {
        id: 'List',
        title: 'List Menu',
        screen: Screens.ListMenu,
        children: [],
      },
      {
        id: 'Side',
        title: 'Side Menu',
        action: 'DrawerOpen',
        screen: Screens.SideMenu,
        children: [],
      },
    ],
  },
  {
    id: 'OtherMenu',
    title: 'Assignments/Projects',
    icon: FontIcons.other,
    screen: Screens.OtherMenu,
    children: [
      {
        id: 'Settings',
        title: 'Settings',
        screen: Screens.Settings,
        children: [],
      },
    ],
  },
  {
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
    screen: Screens.Themes,
    children: [],
  },
];

const menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'GridV2',
  title: 'Start',
  screen: Screens.GridV2,
  children: [],
});

export const MenuRoutes = menuRoutes;
