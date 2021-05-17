import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import ProfileHeader from '../components/navigation/ProfileHeader';

const ProfileLandingScreen = ({ navigation }) => {
  const navigateLoginLanding = () => {
    // navigation.navigate('LoginLanding');
    console.log('btn works');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ProfileHeader />
      <Text style={styles.landingTitle}>Its time to create your profile!</Text>
      <Layout style={{ flex: 2 }}>
        <Image
          style={styles.landingImage}
          source={require('../assets/images/profile-interface.png')}
        />
      </Layout>
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onPress={navigateLoginLanding} style={styles.btn}>
          Let's Go!
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  btn: {
    backgroundColor: '#407BFF',
    width: '50%'
  }
});

export default ProfileLandingScreen;
