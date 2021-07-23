import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { RequestItem } from '../../components/';

const RecentlyLikedScreen = ({ navigation, route }) => {
  const likes = route.params.likes;
  const usersData = useSelector(state => state.users.usersData);

  const [displayLikes, setDisplayLikes] = useState([]);

  useEffect(() => {
    let data = [];

    likes.forEach(user => {
      const filteredUser = usersData.filter(u => u.id === user.id)[0];

      data.push({
        id: user.id,
        timestamp: dayjs(user.timestamp).format('D MMM YY, h:mm A'),
        background: filteredUser.background,
        name: filteredUser.name,
        imagePath: filteredUser.imagePath
      });
    });

    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setDisplayLikes(data);
  }, []);

  const showProfile = data => {
    navigation.navigate('TeamUpStackNavigator', {
      screen: 'TeamUpProfile',
      params: {
        profileData: data
      }
    });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.contentContainer}>
        <Text category='h5' style={styles.headerTitle}>
          All Liked Users
        </Text>
        {displayLikes?.length > 0 ? (
          <FlatList
            style={styles.likedContainer}
            data={displayLikes}
            renderItem={({ item }) => (
              <RequestItem
                senderData={item}
                viewOnly={true}
                viewProfile={showProfile}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            extraData={displayLikes}
            scrollEventThrottle={16}
            bounces={false}
          />
        ) : (
          <Layout style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {`Sorry, we can't find any of your liked users.\nClick on the Team Up icon at the home screen to start!`}
            </Text>
          </Layout>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20
  },
  likedContainer: {
    flex: 1,
    width: '100%'
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default RecentlyLikedScreen;
