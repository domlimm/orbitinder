import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';

const CompareLikedScreen = () => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.contentContainer}>
        <Text category='h5' style={styles.headerTitle}>
          Compare your Liked Users
        </Text>
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
