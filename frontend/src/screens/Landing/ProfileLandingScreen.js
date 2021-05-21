import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { NavHeader, LandingImage } from '../../components/index';

const ProfileLandingScreen = ({ navigation }) => {
  const navigateLoginLanding = () => {
    navigation.navigate('InputBackground1');
  };

  let navProps = {
    navigation: navigation,
    type: 'profile',
    backNav: false
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader navProps={navProps} />
      <Text style={styles.landingTitle}>It's time to create your profile!</Text>
      <Layout style={styles.imgContainer}>
        <LandingImage
          imgSrc={require('../../assets/images/profile-interface.png')}
        />
      </Layout>
      <Layout style={styles.btnContainer}>
        <Button onPress={navigateLoginLanding} style={styles.btn}>
          Let's Go!
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  landingTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 20,
    color: '#407BFF'
  },
  imgContainer: {
    flex: 2
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: '50%'
  }
});

export default ProfileLandingScreen;