import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import onboardingData from '../../constants/onboardingData';
import {
  OnboardingItem,
  Paginator,
  OnboardingButton,
  NavHeader
} from '../../components/index';

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('LoginLanding');
    }
  };

  const navProps = {
    navigation: navigation,
    type: 'landing',
    backNav: false
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <NavHeader navProps={navProps} />
      <Layout style={styles.container}>
        <Layout style={styles.expanded}>
          <FlatList
            data={onboardingData}
            renderItem={({ item }) => <OnboardingItem item={item} />}
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
        </Layout>
        <Paginator data={onboardingData} scrollX={scrollX} />
        <OnboardingButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / onboardingData.length)}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  expanded: {
    flex: 3
  }
});

export default OnboardingScreen;
