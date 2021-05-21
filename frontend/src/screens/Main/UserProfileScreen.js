import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Layout, Text, Card, Icon } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

import { BackIcon } from '../../components/index';

const UserProfileScreen = ({ navigation }) => {
  // const navigateDetails = () => {
  //   navigation.navigate('ActivityFeedScreen');
  // };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        {/* <Icon
          fill='white'
          name='arrow-back'
          onPress={navigateBack}
          style={styles.icon}
        /> */}
        <Layout style={styles.headerContainer}>
          <BackIcon navigation={navigation} />

          <Image
            style={styles.avatarImg}
            source={{ uri: 'https://i.pravatar.cc/300' }}
          />
          <Layout style={styles.headerCaptions}>
            <Text style={styles.name}>Rebecca Black</Text>
            <Layout style={styles.subCaptionsContainer}>
              <Text style={styles.subCaptions}>Year 1</Text>
              <Text style={styles.subCaptions}>Business Analytics</Text>
            </Layout>
          </Layout>
          <Layout style={styles.linksIcons}>
            <FontAwesome
              name='linkedin-square'
              size={30}
              color='white'
              style={{ marginHorizontal: 5 }}
            />
            <FontAwesome
              name='github-square'
              size={30}
              color='white'
              style={{ marginHorizontal: 5 }}
            />
          </Layout>
        </Layout>
        <Layout style={styles.contentContainer}>
          <Card style={styles.contentCard}>
            <Text style={styles.cardTitle}>ABOUT ME</Text>
            <Text>
              Rebecca Renee Black is an American YouTuber and singer who gained
              extensive media coverage when the music video for her 2011 single
              "Friday" went viral on YouTube and other social media sites.
              "Friday" was derided by many music critics and viewers, who dubbed
              it "the worst song ever"
            </Text>
          </Card>
          <Card style={styles.contentCard}>
            <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
            <Layout style={styles.tagContainer}>
              <Button
                style={styles.tags}
                size='small'
                appearance='outline'
                status='basic'
              >
                Finance
              </Button>
              <Button
                style={styles.tags}
                size='small'
                appearance='outline'
                status='basic'
              >
                Social
              </Button>
            </Layout>
          </Card>

          <Layout style={styles.groupContainer}>
            <Card style={styles.cardGroup}>
              <Text style={styles.cardTitle}>Coding Exp Level</Text>
              <Button
                style={styles.tags}
                size='small'
                appearance='outline'
                status='basic'
              >
                Beginner
              </Button>
            </Card>
            <Card style={styles.cardGroup}>
              <Text style={styles.cardTitle}>Commitment</Text>
              <Button
                style={styles.tags}
                size='small'
                appearance='outline'
                status='basic'
              >
                High
              </Button>
              <Text></Text>
              <Text></Text>
            </Card>
          </Layout>
          <Card style={styles.contentCard}>
            <Text style={styles.cardTitle}>TECHNOLOGIES</Text>
            <Layout style={styles.tagContainer}>
              <Button
                style={styles.tags}
                size='small'
                appearance='ghost'
                status='basic'
              >
                Flutter
              </Button>
              <Button
                style={styles.tags}
                size='small'
                appearance='ghost'
                status='basic'
              >
                React-Native
              </Button>
              <Button
                style={styles.tags}
                size='small'
                appearance='ghost'
                status='basic'
              >
                React-Native
              </Button>
              <Button
                style={styles.tags}
                size='small'
                appearance='ghost'
                status='basic'
              >
                React-Native
              </Button>
            </Layout>
          </Card>
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
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'flex-start',
    backgroundColor: '#407BFF',
    flex: 1
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#407BFF',
    height: 270,
    alignItems: 'center'
  },
  avatarImg: {
    width: 70,
    height: 70,
    borderRadius: 32,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1
  },
  headerCaptions: {
    marginVertical: 10,
    backgroundColor: '#407BFF',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
    // fontFamily: 'Lato'
  },
  subCaptionsContainer: {
    backgroundColor: '#407BFF',
    alignItems: 'flex-start',
    marginTop: 5,
    flexDirection: 'row'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginVertical: 1,
    letterSpacing: 1,
    marginRight: 10
  },
  linksIcons: {
    backgroundColor: '#407BFF',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    // flex: 1
    // backgroundColor: '#'
  },
  contentCard: {
    margin: 5,
    shadowColor: 'grey',
    shadowRadius: 4
    // flexWrap: 'wrap'
  },
  cardTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 5
  },
  cardSubContend: {},
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  tags: {
    marginRight: 5
  },
  groupContainer: {
    flexDirection: 'row'
  },
  cardGroup: {
    width: '50%',
    height: 100
  }
});

export default UserProfileScreen;
