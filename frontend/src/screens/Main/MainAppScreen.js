import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Layout,
  Icon,
  TopNavigationAction,
  TopNavigation,
  Text,
  Avatar
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import greeting from '../../utils/Greeting';
import CountDown from '../../utils/Countdown';
import { UserAvatar } from '../../components/index';

const MainAppScreen = ({ navigation }) => {
  const [image, setImage] = React.useState('');
  const { name } = useSelector(state => state.auth);
  const { userData } = useSelector(state => state.user);

  React.useEffect(() => {
    if (userData.imagePath !== undefined) {
      setImage(userData.imagePath);
    }
  }, [userData]);

  const navigateActivityFeed = () => {
    navigation.navigate('ActivityFeed');
  };

  const navigateProfileScreen = () => {
    setTimeout(() => {
      navigation.navigate('ProfileNavigator');
    }, 975);
  };

  const renderTitle = () => <Text style={styles.titleHeader}>Home</Text>;

  const DrawerIcon = props => (
    <Icon
      {...props}
      name='menu-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
      onPress={() => navigation.openDrawer()}
    />
  );
  const renderSettingsIcon = () => <TopNavigationAction icon={DrawerIcon} />;

  const NotificationsIcon = props => (
    <Icon
      {...props}
      name='bell-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
    />
  );
  const renderNotificationsIcon = () => (
    <TopNavigationAction
      icon={NotificationsIcon}
      onPress={navigateActivityFeed}
    />
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <TopNavigation
        title={renderTitle}
        alignment='center'
        accessoryLeft={renderSettingsIcon}
        accessoryRight={renderNotificationsIcon}
      />
      <ScrollView>
        <TouchableNativeFeedback
          onPress={navigateProfileScreen}
          background={TouchableNativeFeedback.Ripple('#00000020', false)}
          useForeground={true}
        >
          <Layout style={[styles.introCard, styles.greetingCard]}>
            <Layout>
              <Text style={styles.greetingTitle}>{greeting()}</Text>
              <Text>{name}</Text>
            </Layout>
            {image.length > 0 ? (
              <Avatar shape='rounded' size='giant' source={{ uri: image }} />
            ) : (
              <UserAvatar name={name} size={56} fontSize={28} />
            )}
          </Layout>
        </TouchableNativeFeedback>
        <Layout style={[styles.introCard, styles.countdownCard]}>
          <Text category='h5' style={styles.countDownTitle}>
            Time Remaining for Orbital Application
          </Text>
          <CountDown />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  introCard: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
  },
  greetingCard: {
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row'
  },
  countdownCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'column'
  },
  greetingTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  countDownTitle: {
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 32
  },
  notifCard: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default MainAppScreen;
