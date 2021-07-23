import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';

const CompareLikedScreen = () => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <Text>CompareLikedScreen</Text>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  }
});

export default CompareLikedScreen;
