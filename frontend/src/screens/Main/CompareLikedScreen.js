import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Animated, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { CompareUserCard, Paginator } from '../../components';

const CompareLikedScreen = () => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);

  const [displayLikes, setDisplayLikes] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    if (userData !== undefined && usersData !== undefined) {
      const { likes } = userData;
      const likesUserData = usersData.filter(
        user => likes.indexOf(user.id) > -1
      );

      setDisplayLikes(likesUserData);
    }
  }, [userData, usersData]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < displayLikes.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('blah');
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.contentContainer}>
        <Text category='h5' style={styles.headerTitle}>
          Compare your Liked Users
        </Text>
        <FlatList
          data={displayLikes}
          renderItem={({ item }) => <CompareUserCard userData={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={displayLikes} scrollX={scrollX} />
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
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8
  }
});

export default CompareLikedScreen;
