import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text } from '@ui-kitten/components';
// To separate for local imports rather than installed dependencies: add below onwards
import { ProfileHeader, LandingImage } from '../components/navigation/index';

const ProfileLandingScreen = ({ navigation }) => {
  const navigateLoginLanding = () => {
    navigation.navigate('InputBackgroundScreen1');
    // console.log('btn works');
  };

  let navProps = {
    navigation: navigation,
    needBackNav: false
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader {...navProps} />
      <Text style={styles.landingTitle}>Its time to create your profile!</Text>
      <Layout style={styles.imgContainer}>
        <LandingImage
          imgSrc={require('../assets/images/profile-interface.png')}
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
