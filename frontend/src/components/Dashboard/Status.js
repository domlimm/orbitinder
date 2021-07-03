import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';

const Status = () => {
  const todayDate = dayjs(new Date()).format('D MMMM YY');

  return (
    <Layout style={styles.mainContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>As of {todayDate},</Text>
        <Text category='h5' style={styles.statusText}>
          You have not found a teammate!
        </Text>
      </View>
      <View style={styles.statusImage}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/orbital-logo.png')}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 108,
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    // backgroundColor: '#407BFF',
    backgroundColor: '#FFB73A',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  statusContainer: {
    width: '80%',
    justifyContent: 'center'
  },
  statusText: {
    fontWeight: 'bold'
  },
  statusImage: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 62,
    height: 62
  }
});

export default Status;
