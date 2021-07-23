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
import dayjs from 'dayjs';
import { FontAwesome5 } from '@expo/vector-icons';

import UserAvatar from '../UserProfile/UserAvatar';

const { width } = Dimensions.get('window');

const RecentLikes = () => {
  const navigation = useNavigation();

  const [allLiked, setAllLiked] = useState([]);
  const [liked, setLiked] = useState([]);

  const usersData = useSelector(state => state.users.usersData);
  const userData = useSelector(state => state.user.userData);

  const PointIcon = () => (
    <FontAwesome5 name='hand-point-down' size={26} color='#407BFF' />
  );

  useEffect(() => {
    if (userData.recentLikes !== undefined && usersData !== undefined) {
      const recentLikes = userData.recentLikes;

      recentLikes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setAllLiked(recentLikes);

      const latestLikes = recentLikes.slice(0, 5);

      const mappedLikes = latestLikes.map(user => user.id);

      const filteredUsers = usersData.filter(
        user => mappedLikes.indexOf(user.id) > -1
      );

      let displayData = [];

      filteredUsers.forEach(user => {
        displayData.push({
          ...user,
          timestamp: dayjs(
            latestLikes.filter(likes => likes.id === user.id)[0].timestamp
          ).format('D MMM YY, h:mm A')
        });
      });

      displayData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setLiked(displayData);
    }
  }, [userData, usersData]);

  const navigateProfileScreen = data => {
    navigation.navigate('TeamUpStackNavigator', {
      screen: 'TeamUpProfile',
      params: { profileData: data }
    });
  };

  const navigateLiked = () => {
    navigation.navigate('LikedTopTabNavigator', {
      screen: 'RecentlyLiked',
      params: { likes: allLiked }
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
          <Text
            category='s1'
            style={[styles.profileText, { fontWeight: 'bold' }]}
          >
            {background.achievement}
          </Text>
          <Text
            category='label'
            style={[styles.profileText, { marginTop: 24 }]}
          >
            {data.timestamp}
          </Text>
        </Layout>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.headerTitleContainer}>
          <Text category='h5' style={styles.headerTitle}>
            Recently Liked
          </Text>
        </View>
        {liked.length > 0 && (
          <View style={styles.headerActionContainer}>
            <Text
              category='h6'
              style={styles.headerAction}
              onPress={navigateLiked}
            >
              View More
            </Text>
          </View>
        )}
      </View>
      {liked.length > 0 ? (
        <FlatList
          data={liked}
          renderItem={({ item }) => <ProfileCard key={item.id} data={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={userData}
          style={{ marginRight: 30, overflow: 'visible' }}
          scrollEventThrottle={16}
          snapToAlignment='center'
        />
      ) : (
        <Layout style={styles.emptyContainer}>
          <Text category='p1' style={styles.emptyText}>
            Click on the Team Up icon right below to get started!
          </Text>
          <PointIcon />
        </Layout>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 50
  },
  titleContainer: {
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitleContainer: {
    width: '60%'
  },
  headerTitle: {
    fontWeight: 'bold'
  },
  headerActionContainer: {
    alignItems: 'flex-end',
    width: '40%'
  },
  headerAction: {},
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
  },
  emptyContainer: {
    width: width - 40,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, 0.4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8
  }
});

export default RecentLikes;
