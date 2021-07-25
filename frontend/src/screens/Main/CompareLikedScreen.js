import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import { CompareUserCard } from '../../components';

const { width, height } = Dimensions.get('window');

const CompareLikedScreen = () => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);

  const [displayLikes, setDisplayLikes] = useState([]);

  useEffect(() => {
    if (userData !== undefined && usersData !== undefined) {
      const { recentLikes } = userData;
      const likesUserData = usersData.filter(
        user => recentLikes.filter(u => u.id === user.id).length > 0
      );

      setDisplayLikes(likesUserData);
    }
  }, [userData, usersData]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <Text category='h5' style={styles.headerTitle}>
          Compare your Liked Users
        </Text>
      </Layout>
      <Layout style={styles.contentContainer}>
        <Carousel
          data={displayLikes}
          layout='stack'
          renderItem={({ item, index }) => (
            <CompareUserCard userData={item} index={index} />
          )}
          sliderWidth={width}
          itemWidth={width * 0.9}
          layoutCardOffset={18}
        />
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
    justifyContent: 'center'
  },
  selectorContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 20
  }
});

export default CompareLikedScreen;
