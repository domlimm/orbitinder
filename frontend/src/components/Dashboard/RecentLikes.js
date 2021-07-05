import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  FlatList,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import UserAvatar from '../UserProfile/UserAvatar';

const { width } = Dimensions.get('window');

const RecentLikes = () => {
  const navigation = useNavigation();

  const [liked, setLiked] = useState([]);

  const usersData = useSelector(state => state.users.usersData);
  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
    if (userData.recentLikes !== undefined && usersData !== undefined) {
      const recentLikes = userData.recentLikes;

      recentLikes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const latestLikes = recentLikes.slice(0, 5);

      const mappedLikes = latestLikes.map(user => user.id);

      const filteredUsers = usersData.filter(
        user => mappedLikes.indexOf(user.id) > -1
      );

      setLiked(filteredUsers);
    }
  }, [userData, usersData]);

  const navigateProfileScreen = data => {
    navigation.navigate('TeamUpStackNavigator', {
      screen: 'TeamUpProfile',
      params: { profileData: data }
    });
  };

  const ProfileCard = ({ data }) => {
    const { name, imagePath, background } = data;
    const { degree, year } = background;

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#00000020', false)}
        useForeground={true}
        onPress={() => navigateProfileScreen(data)}
      >
        <Layout style={styles.profileContainer}>
          {imagePath.length > 0 ? (
            <Avatar
              size='giant'
              style={styles.avatar}
              source={{ uri: imagePath }}
            />
          ) : (
            <UserAvatar name={name} size={86} fontSize={42} />
          )}
          <Text category='h6' style={styles.profileName}>
            {name}
          </Text>
          <Text category='s1' style={styles.profileText}>
            {degree}
          </Text>
          <Text category='s1' style={styles.profileText}>
            {year}
          </Text>
          <Text category='s1' style={styles.profileText}>
            {background.achievement}
          </Text>
        </Layout>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text category='h5' style={styles.headerTitle}>
        Recently Liked
      </Text>
      <FlatList
        data={liked}
        renderItem={({ item }) => <ProfileCard key={item.id} data={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={32}
        extraData={liked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginBottom: 50
  },
  headerTitle: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 86,
    height: 86
  },
  profileContainer: {
    backgroundColor: '#407BFF',
    width: width * 0.5,
    marginRight: 12,
    marginLeft: 2,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, 0.4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3,
    alignItems: 'center'
  },
  profileName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: 'white'
  },
  profileText: {
    textAlign: 'center',
    color: 'white'
  }
});

export default RecentLikes;
