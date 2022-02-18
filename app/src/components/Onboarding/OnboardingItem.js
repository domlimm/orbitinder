import React from 'react';
import { useWindowDimensions, Image, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <Layout style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />
      <Layout style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Layout>
    </Layout>
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
