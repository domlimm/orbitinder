import React from 'react';
import { View, useWindowDimensions, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 0.7,
    justifyContent: 'center'
  },
  content: {
    flex: 0.3
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 64
  }
});

export default OnboardingItem;
