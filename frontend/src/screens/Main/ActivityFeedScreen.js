import React from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import {
  Button,
  Layout,
  List,
  ListItem,
  Avatar,
  Divider,
  Card,
  Text
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards
import AuthHeader from '../../components/navigation/BackTopNav';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ActivityFeedScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate('UserProfileScreen');
  };

  let navProps = {
    navigation: navigation,
    needBrand: false,
    title: 'Activity Feed'
  };

  const [data, setData] = React.useState(
    new Array(5).fill({
      userName: 'John Doe',
      avatar: {
        uri: 'https://i.pravatar.cc'
      },
      content: 'Has sent a request to you',
      timeAgo: '1h ago'
    })
  );

  const renderItems = ({ item }) => (
    <ListItem onPress={navigateDetails}>
      <Layout
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 5
        }}
      >
        <Avatar shape='rounded' source={item.avatar} />

        <Layout style={{ marginLeft: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.userName}
          </Text>

          <Text style={{ color: 'grey', fontSize: 14 }}>{item.timeAgo}</Text>
          <Text style={{ marginTop: 5, fontSize: 14 }}>{item.content}</Text>
        </Layout>
      </Layout>
    </ListItem>
  );

  const renderItemIcon = ({ item }) => {
    // console.log(item);
    return <Avatar source={{ uri: 'https://i.pravatar.cc/' }} />;
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <AuthHeader navigation={navigation} />
      <Divider />
      <List
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItems}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain'
  },
  layoutContainerTop: {
    height: '50%'
  },
  layoutContainerBottom: {
    height: '50%',
    alignItems: 'center'
  },
  textContent: {
    textAlign: 'center',
    fontSize: 17
  },
  signUpBtn: {
    width: '70%',
    marginVertical: 15
  },
  logInBtn: {
    width: '70%'
  },
  scrollView: {
    // backgroundColor: '#fafafa'
  }
});

export default ActivityFeedScreen;
