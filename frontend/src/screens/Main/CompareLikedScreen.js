import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import { CompareUserCard, CompareUserProfile } from '../../components';

const { width, height } = Dimensions.get('window');

const CompareLikedScreen = () => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);

  const [displayLikes, setDisplayLikes] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (userData !== undefined && usersData !== undefined) {
      const { recentLikes } = userData;
      const likesUserData = usersData.filter(
        user => recentLikes.filter(u => u.id === user.id).length > 0
      );

      setDisplayLikes(likesUserData);
    }
  }, [userData, usersData]);

  const selectedHandler = id => {
    let selectedArr = [...selectedUsers];

    if (selectedArr.includes(id)) {
      selectedArr = selectedArr.filter(userId => userId !== id);
      setSelectedUsers(selectedArr);
      return;
    }

    if (selectedArr.length > 2) {
      selectedArr.shift();
    }

    selectedArr.push(id);
    setSelectedUsers(selectedArr);
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <Text category='h5' style={styles.headerTitle}>
          Compare your Liked Users
        </Text>
      </Layout>
      <Layout style={styles.usersContainer}>
        <Carousel
          data={displayLikes}
          layout='stack'
          renderItem={({ item }) => (
            <CompareUserCard
              userData={item}
              userId={item.id}
              selectedUsers={selectedUsers}
              selectedHandler={userId => selectedHandler(userId)}
            />
          )}
          keyExtractor={item => item.id}
          sliderWidth={width}
          itemWidth={width * 0.9}
          layoutCardOffset={18}
          extraData={displayLikes}
        />
      </Layout>
      <Layout style={styles.resultContainer}>
        <FlatList
          data={usersData}
          renderItem={({ item }) => {
            if (selectedUsers.includes(item.id)) {
              return <CompareUserProfile userData={item} />;
            }
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  usersContainer: {
    justifyContent: 'center',
    paddingBottom: 20
  },
  selectorContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 20
  },
  resultContainer: {
    flex: 1
  }
});

export default CompareLikedScreen;
