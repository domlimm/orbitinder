import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Linking,
  View
} from 'react-native';
import { Layout, Button, Text, Icon } from '@ui-kitten/components';

const Info = () => {
  const LinkIcon = () => (
    <Icon
      style={styles.iconstyle}
      fill='#000000'
      name='external-link-outline'
    />
  );
  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          Linking.openURL('https://nusskylab-dev.comp.nus.edu.sg/');
        }}
        background={TouchableNativeFeedback.Ripple('#00000020', false)}
        useForeground={true}
      >
        <Layout style={styles.mainContainer}>
          <View style={styles.text}>
            <Text category='h6'>Link to Orbital Information</Text>
          </View>
          <View style={styles.icon}>
            <LinkIcon />
          </View>
        </Layout>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '90%',
    justifyContent: 'center'
  },
  iconstyle: {
    width: 32,
    height: 32
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%'
  },
  mainContainer: {
    margin: 20,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, 0.4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20
  }
});

export default Info;
