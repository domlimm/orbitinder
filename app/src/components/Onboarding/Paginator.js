import React from 'react';
import { StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <Layout style={styles.container}>
      {data.map((_, i) => {
        // previous, current, next
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp'
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity: opacity }]}
            key={i.toString()}
          />
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#407BFF',
    marginHorizontal: 8
  }
});

export default Paginator;
