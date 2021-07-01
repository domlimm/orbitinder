import { navigationRef } from '../navigation/RootNavigation';

export default route => {
  switch (route) {
    case 'RequestsOverview':
      return navigationRef.current?.navigate('DrawerNavigator', {
        screen: 'MainNavigator',
        params: {
          screen: 'ChatsNavigator',
          params: { screen: 'TopTabsNavigator', params: { screen: route } }
        }
      });
    case 'ChatsOverview':
      return navigationRef.current?.navigate('DrawerNavigator', {
        screen: 'MainNavigator',
        params: {
          screen: 'ChatsNavigator',
          params: { screen: 'TopTabsNavigator', params: { screen: route } }
        }
      });
    default:
      return;
  }
};
