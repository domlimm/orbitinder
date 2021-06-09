import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Layout, Text, Avatar } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

import { LandingImage, NavHeader, Toast } from '../../components/index';

const InputProfilePhotoScreen = ({ navigation }) => {
  const [imagePath, setImagePath] = React.useState(null);
  const [hasAdded, setHasAdded] = React.useState(false);
  const [galleryPermission, setGalleryPermission] = React.useState(null);
  const [cameraPermission, setCameraPermission] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('');

  const defaultImage = require('../../assets/images/orbital-logo.png');

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        setGalleryPermission(galleryStatus.status === 'granted');

        if (galleryStatus.status !== 'granted') {
          setAlertMessage(
            'Sorry, we need camera roll permissions to make this work!'
          );
          setShowAlert(true);
          setAlertStatus('warning');
        }

        const cameraStatus = await Camera.requestPermissionsAsync();

        setCameraPermission(cameraStatus.status === 'granted');

        if (cameraStatus.status !== 'granted') {
          setAlertMessage(
            'Sorry, we need camera permissions to make this work!'
          );
          setShowAlert(true);
          setAlertStatus('warning');
        }
      }
    })();
  }, [navigation]);

  const galleryHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setHasAdded(true);
      setImagePath(result.uri);
    }
  };

  const cameraHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setHasAdded(true);
      setImagePath(result.uri);
    }
  };

  const skipHandler = () => {
    navigation.navigate('InputBackground1', {
      imagePath: imagePath ? imagePath : ''
    });
  };

  const deleteHandler = () => {
    setImagePath(null);
  };

  const navProps = {
    navigation: navigation,
    type: 'landing',
    backNav: false
  };

  return (
    <KeyboardAvoidingView
      style={styles.kbContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeAreaView style={styles.parentContainer}>
        <NavHeader navProps={navProps} />
        {showAlert && (
          <Toast
            message={alertMessage}
            status={alertStatus}
            hide={show => setShowAlert(show)}
          />
        )}
        <ScrollView>
          {imagePath || hasAdded ? (
            <>
              <Layout style={styles.avatarContainer}>
                {imagePath ? (
                  <Avatar
                    size='giant'
                    source={imagePath ? { uri: imagePath } : defaultImage}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Avatar
                      size='giant'
                      source={imagePath ? { uri: imagePath } : defaultImage}
                      style={[styles.avatar, { position: 'absolute' }]}
                    />
                    <Ionicons
                      name='add'
                      size={48}
                      color='#FFF'
                      style={styles.addIcon}
                    />
                  </View>
                )}
              </Layout>
              <Layout style={styles.textContainer}>
                <Text style={styles.title}>
                  {hasAdded && !imagePath
                    ? 'Default Profile Photo'
                    : 'Profile Photo Added'}
                </Text>
                <Text style={styles.subText}>
                  {hasAdded && !imagePath
                    ? 'We will use this, but you can change it later!'
                    : 'Select the options below to change your photo'}
                </Text>
              </Layout>
            </>
          ) : (
            <>
              <Text style={styles.title}>Add Profile Photo</Text>
              <Layout style={styles.landingImageContainer}>
                <LandingImage
                  imgSrc={require('../../assets/images/input-profile-photo.png')}
                />
              </Layout>
            </>
          )}
          <Layout style={styles.btnContainer}>
            <Button style={styles.btn} onPress={cameraHandler}>
              {imagePath ? 'Replace using Camera' : 'Capture a Photo'}
            </Button>
            <Button style={styles.btn} onPress={galleryHandler}>
              {imagePath ? 'Edit with Gallery' : 'Pick from Gallery'}
            </Button>
            <Layout style={styles.miniActionsContainer}>
              {imagePath && (
                <Text style={styles.actionsText} onPress={deleteHandler}>
                  Remove
                </Text>
              )}
              <Text style={styles.actionsText} onPress={skipHandler}>
                Skip
              </Text>
            </Layout>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kbContainer: {
    flex: 1
  },
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#E1E2E6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    margin: 8,
    height: 120,
    width: 120
  },
  addIcon: {
    marginTop: 6,
    marginLeft: 2
  },
  textContainer: {
    marginBottom: 30,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 24,
    marginTop: 20,
    flexWrap: 'wrap'
  },
  subText: {
    marginVertical: 8,
    flexWrap: 'wrap'
  },
  landingImageContainer: {
    height: Dimensions.get('window').height / 2
  },
  btnContainer: {
    alignItems: 'center'
  },
  btn: {
    marginVertical: 8,
    width: '70%'
  },
  miniActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  actionsText: {
    marginVertical: 10,
    marginHorizontal: 50,
    color: '#407BFF',
    flexWrap: 'wrap'
  }
});

export default InputProfilePhotoScreen;
