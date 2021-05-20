import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Button, Layout, Input, Text } from '@ui-kitten/components';

const UserProfileScreen = ({ navigation }) => {
  // const navigateDetails = () => {
  //   navigation.navigate('ActivityFeedScreen');
  // };

  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <Text>hi</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default UserProfileScreen;
