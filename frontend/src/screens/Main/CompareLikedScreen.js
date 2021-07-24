import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Animated, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import { CompareUserCard } from '../../components';
import Paginator from '../../components/Dashboard/Paginator';

const { width, height } = Dimensions.get('window');

const CompareLikedScreen = () => {
  const userData = useSelector(state => state.user.userData);
  const usersData = useSelector(state => state.users.usersData);

  const [displayLikes, setDisplayLikes] = useState([]);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (userData !== undefined && usersData !== undefined) {
      const { recentLikes } = userData;
      const likesUserData = usersData.filter(
        user => recentLikes.filter(u => u.id === user.id).length > 0
      );

      setDisplayLikes(likesUserData);
    }
  }, [userData, usersData]);

  // const viewableItemsChanged = useRef(({ viewableItems }) => {
  //   setCurrentIndex(viewableItems[0].index);
  // }).current;

  // const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

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
          renderItem={({ item }) => <CompareUserCard userData={item} />}
          sliderWidth={width}
          itemWidth={width * 0.8}
        />
        {/* <Layout style={styles.selectorContainer}>
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
            // onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
          <Paginator data={displayLikes} scrollX={scrollX} />
        </Layout> */}
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
