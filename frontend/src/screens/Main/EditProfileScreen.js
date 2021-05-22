import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Layout, Text, Card, Icon, Input } from '@ui-kitten/components';
import { BioInput, TitleHeader } from '../../components/index';
import { userData } from '../../constants/userData';

const EditProfileScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  let navProps = {
    title: 'Edit Profile',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };
  const [status, setStatus] = React.useState(false);

  const [userDataBio, setBio] = React.useState(userData.bio);
  const [savedBio, setUnsavedBio] = React.useState(userData.bio);

  const sendDataToParent = index => {
    // the callback. Use a better name
    console.log(index);
    setBio(index);
  };

  const discardChanges = () => {
    setBio(savedBio);
    console.log(userDataBio);
  };

  const updateChanges = () => {
    setUnsavedBio(userDataBio);
    console.log(userDataBio);
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <TitleHeader navProps={navProps} />
        <Layout style={styles.inputContainer}>
          <BioInput
            // key={userDataBio}
            userData={userDataBio}
            status={status}
            sendDataToParent={sendDataToParent}
          />
        </Layout>
        <Layout style={styles.btnContainer}>
          <Button
            style={styles.stateBtn}
            status='danger'
            onPress={discardChanges}
          >
            Discard
          </Button>
          <Button
            style={styles.stateBtn}
            status='success'
            onPress={updateChanges}
          >
            Save
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  inputContainer: {
    // flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  btnContainer: {
    flex: 1,
    // alignItems: 'center'
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  stateBtn: {
    width: '35%',
    marginVertical: 30
  }
});

export default EditProfileScreen;
