import { navigationRef } from '../navigation/RootNavigation';

export default route => {
  switch (route) {
    case 'RequestsOverview':
      return navigationRef.current?.navigate();
    case 'ChatsOverview':
      return navigationRef.current?.navigate();
    default:
      return;
  }
};
