import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import { CompareUserCard, CompareUserProfile } from '../../components';

const { width } = Dimensions.get('window');

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

    if (selectedArr.length > 1) {
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
          layout='default'
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
          itemWidth={width * 0.86}
          extraData={displayLikes}
        />
      </Layout>
      <Layout style={styles.resultSV}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout
            style={{
              flexDirection: selectedUsers.length > 1 ? 'row' : 'column',
              paddingHorizontal: 2
            }}
          >
            {selectedUsers.map(item =>
              usersData
                .filter(user => user.id === item)
                .map(uData => (
                  <CompareUserProfile
                    key={uData.id}
                    userData={uData}
                    dynamicWidth={width / selectedUsers.length}
                    dynamicFlex={1 / selectedUsers.length}
                    double={selectedUsers.length > 1}
                  />
                ))
            )}
          </Layout>
        </ScrollView>
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
  resultSV: {
    flex: 1
  }
});

export default CompareLikedScreen;
