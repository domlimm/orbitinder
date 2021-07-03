import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableNativeFeedback
} from 'react-native';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import UserAvatar from '../UserProfile/UserAvatar';

const Status = () => {
  const navigation = useNavigation();

  const [match, setMatch] = useState(false);
  const [myImage, setMyImage] = useState('');
  const [teammate, setTeammate] = useState({});
  const [teamName, setTeamName] = useState('');
  const [teamImage, setTeamImage] = useState('');

  const { name } = useSelector(state => state.auth);
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);
  const todayDate = dayjs(new Date()).format('D MMMM YY');

  useEffect(() => {
    if (userData.matchId !== undefined) {
      setMatch(userData.matchId.length > 0);
    }

    if (userData.imagePath !== undefined) {
      setMyImage(userData.imagePath);
    }

    if (userData.matchId !== undefined && usersData !== undefined) {
      const matchId = userData.matchId;

      if (matchId.length > 0) {
        const match = usersData.filter(user => user.id === matchId)[0];

        setTeammate(match);
        setTeamName(match.name);
        setTeamImage(match.imagePath);
      }
    }
  }, []);

  const Connector = () => <View style={styles.connector} />;

  const TimerIcon = () => (
    <Ionicons name='timer-outline' size={50} color='#FFB73A' />
  );

  const navigateProfileScreen = () => {
    navigation.navigate('TeamUpStackNavigator', {
      screen: 'TeamUpProfile',
      params: { profileData: teammate }
    });
  };

  return (
    <>
      {!match ? (
        <Layout style={[styles.mainContainer, styles.notFound]}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>As of {todayDate},</Text>
            <Text category='h6' style={styles.statusText}>
              You have not found a teammate!
            </Text>
          </View>
          <View style={styles.statusTimer}>
            <TimerIcon />
          </View>
        </Layout>
      ) : (
        <TouchableNativeFeedback
          onPress={navigateProfileScreen}
          background={TouchableNativeFeedback.Ripple('#00000020', false)}
          useForeground={true}
        >
          <Layout style={[styles.mainContainer, styles.found]}>
            <View style={styles.matchedTextContainer}>
              <Text category='h6' style={styles.matchedText}>
                <Text>Teamed up with</Text>
                {`\n${teammate.name}`}
              </Text>
            </View>
            <View style={styles.matchingContainer}>
              <View style={styles.matchedChild}>
                {myImage.length > 0 ? (
                  <Avatar size='giant' source={{ uri: myImage }} />
                ) : (
                  <UserAvatar name={name} size={56} fontSize={28} />
                )}
              </View>
              <Connector />
              <View style={styles.statusImage}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/orbital-logo.png')}
                />
              </View>
              <Connector />
              <View style={styles.matchedChild}>
                {teamImage.length > 0 ? (
                  <Avatar size='giant' source={{ uri: teamImage }} />
                ) : (
                  <UserAvatar name={teamName} size={56} fontSize={28} />
                )}
              </View>
            </View>
          </Layout>
        </TouchableNativeFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  found: {
    backgroundColor: '#B2D1FF'
  },
  notFound: {
    height: 88,
    flexDirection: 'row',
    backgroundColor: '#FFB73A'
  },
  statusContainer: {
    width: '80%',
    justifyContent: 'center'
  },
  statusText: {
    fontWeight: 'bold'
  },
  statusTimer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#FFF',
    height: 64,
    width: 64,
    alignSelf: 'center'
  },
  matchingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchedChild: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchedTextContainer: {
    marginBottom: 10
  },
  matchedText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  connector: {
    width: '14%',
    borderBottomColor: '#407BFF',
    borderBottomWidth: 3,
    alignSelf: 'center',
    marginHorizontal: 5
  }
});

export default Status;
