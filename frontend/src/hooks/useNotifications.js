import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

const useNotifications = () => {
  const notiResponseListener = useRef(null);

  useEffect(() => {
    notiResponseListener.current =
      Notifications.addNotificationResponseReceivedListener(res => {
        console.log(res.notification.request.content.data);
        console.log('successfully addNotificationResponseReceivedListener');
      });

    return () =>
      Notifications.removeNotificationSubscription(notiResponseListener);
  }, []);
};

export default useNotifications;
