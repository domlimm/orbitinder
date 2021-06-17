import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import { RequestItem } from '../../components/index';

const RequestsScreen = () => {
  // Temporary
  const users = useSelector(state => state.users.usersData);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout style={styles.chatsContainer}>
        <FlatList
          style={styles.requestContainer}
          data={users}
          renderItem={({ item }) => (
            <RequestItem
              name={item.name}
              imagePath={item.imagePath}
              year={item.background.year}
              degree={item.background.degree}
              biography={item.background.biography}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  chatsContainer: {
    flex: 1,
    paddingVertical: 5
  },
  requestContainer: {
    flex: 1,
    width: '100%'
  }
});

export default RequestsScreen;
