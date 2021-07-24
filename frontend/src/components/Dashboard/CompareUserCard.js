import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

const CompareUserCard = ({ userData }) => {
  return (
    <Layout style={styles.parentContainer}>
      <View style={styles.actionContainer}>
        <Text>To add check icon</Text>
      </View>
      <Text>{userData.name}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    height: height * 0.26,
    width: width * 0.8,
    backgroundColor: '#407BFF',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default CompareUserCard;
