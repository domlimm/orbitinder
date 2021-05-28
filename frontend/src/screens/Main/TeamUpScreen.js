import React from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards
import { TitleHeader } from '../../components/index';

const TeamUpScreen = ({ navigation }) => {
  const navProps = {
    title: 'Team Up',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: true
  };
  return (
    <SafeAreaView style={styles.parentContainer}>
      <TitleHeader navProps={navProps} />
      <ScrollView>
        <Text>Team Up Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  }
});

export default TeamUpScreen;
