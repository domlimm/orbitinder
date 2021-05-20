import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Button, Layout, Input, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards

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
