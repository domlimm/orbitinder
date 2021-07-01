import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import getFullPath from '../utils/getNavPath';

const useNotifications = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse) {
      const route = JSON.stringify(
        lastNotificationResponse.notification.request.content.data.screen
      );
      getFullPath(JSON.parse(route));
    }
  }, [lastNotificationResponse]);
};

export default useNotifications;
