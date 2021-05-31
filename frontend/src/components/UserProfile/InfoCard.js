import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import InterestTags from './InterestTags';
import { userData } from '../../constants/userData';

const InfoCard = ({ cardData, navProps }) => {
  const handleReadMore = () => {
    navProps.navigation.navigate({
      name: 'UserProfile',
      params: {
        profileData: cardData
      }
    });
  };

  return (
    <Layout style={styles.cardContainer}>
      <Layout style={styles.headerContainer}>
        <Image style={styles.avatarImg} source={{ uri: cardData.img }} />
        <Layout style={styles.headerCaptions}>
          <Text style={styles.name}>{cardData.name}</Text>

          <Text style={styles.subCaptions}>{cardData.major}</Text>
          <Text style={styles.subCaptions}>{cardData.year}</Text>
          <Layout style={styles.subCaptionsContainer}></Layout>
        </Layout>
      </Layout>
      <Layout style={styles.contentContainer}>
        <Text style={styles.sectionText}>{cardData.bio}</Text>
        <Text style={styles.sectionTitle}>INTERESTED AREAS</Text>
        <InterestTags tagsData={cardData.interestedAreas} />

        <Layout style={{ flexDirection: 'column' }}>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.sectionTitle}>EXP LEVEL</Text>
            <Text style={styles.sectionTitleRight}>HAS IDEA?</Text>
          </Layout>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <InterestTags tagsData={cardData.codingExpLevel} />
            <InterestTags tagsData={cardData.idea} />
          </Layout>
        </Layout>
        <Layout style={{ flexDirection: 'column' }}>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.sectionTitle}>ORBITAL LEVEL</Text>
            <Text style={styles.sectionTitleRight}>COMMITMENT</Text>
          </Layout>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <InterestTags tagsData={cardData.level} />
            <InterestTags tagsData={cardData.commitment} />
          </Layout>
        </Layout>
      </Layout>
      <TouchableOpacity
        onPress={handleReadMore}
        style={styles.readMoreContainer}
      >
        <Text style={styles.readMoreText}>VIEW DETAILS</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: 540,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderBottomLeftRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 3
  },
  headerContainer: {
    backgroundColor: '#407BFF',
    height: 150,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 32,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    marginTop: 15
  },
  headerCaptions: {
    marginVertical: 5,
    backgroundColor: '#407BFF',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
    // fontFamily: 'Lato'
  },
  subCaptionsContainer: {
    backgroundColor: '#407BFF',
    alignItems: 'flex-start',
    marginTop: 0,
    flexDirection: 'row'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginVertical: 1,
    letterSpacing: 1,
    textAlign: 'center'
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  sectionTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13
  },
  sectionTitleRight: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'right',
    marginRight: 5
  },
  sectionText: {
    color: 'grey',
    fontSize: 13
  },
  readMoreContainer: {
    backgroundColor: '#8CB1FF',
    height: 30,
    width: 120,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,

    elevation: 5,
    alignItems: 'center'
  },
  readMoreText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 7,
    fontSize: 12
  }
});

export default InfoCard;
