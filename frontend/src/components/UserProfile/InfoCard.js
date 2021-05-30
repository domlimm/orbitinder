import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import InterestTags from './InterestTags';
import { userData } from '../../constants/userData';

const InfoCard = ({ cardData }) => {
  // let cardData = userData;
  // console.log(cardData);
  return (
    <Layout style={styles.cardContainer}>
      <Layout style={styles.headerContainer}>
        <Image
          style={styles.avatarImg}
          source={{ uri: 'https://i.pravatar.cc/300' }}
        />
        <Layout style={styles.headerCaptions}>
          <Text style={styles.name}>{cardData.name}</Text>
          <Layout style={styles.subCaptionsContainer}>
            <Text style={styles.subCaptions}>{cardData.year}</Text>
            <Text style={styles.subCaptions}>{cardData.major}</Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout style={styles.contentContainer}>
        <Text style={styles.sectionText}>{cardData.bio}</Text>
        <Text style={styles.sectionTitle}>INTERESTED AREAS</Text>
        <InterestTags tagsData={cardData.interestedAreas} />

        <Layout
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Layout>
            <Text style={styles.sectionTitle}>SWE EXP LEVEL</Text>
            <InterestTags tagsData={cardData.codingExpLevel} />
          </Layout>
          <Layout>
            <Text style={styles.sectionTitleRight}>HAS IDEA?</Text>
            <InterestTags tagsData={cardData.idea} />
          </Layout>
        </Layout>
        <Layout
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Layout>
            <Text style={styles.sectionTitle}>ORBITAL LEVEL</Text>
            <InterestTags tagsData={cardData.level} />
          </Layout>
          <Layout>
            <Text style={styles.sectionTitleRight}>COMMITMENT</Text>
            <InterestTags tagsData={cardData.commitment} />
          </Layout>
        </Layout>
      </Layout>
      <Layout>
        <TouchableOpacity style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>VIEW MORE</Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
    height: 530,
    backgroundColor: 'white',
    borderRadius: 20
  },
  headerContainer: {
    backgroundColor: '#407BFF',
    height: 140,
    alignItems: 'center'
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 32,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    marginTop: 20
  },
  headerCaptions: {
    marginVertical: 5,
    backgroundColor: '#407BFF',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
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
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginVertical: 1,
    letterSpacing: 1,
    marginRight: 10
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    height: 360
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
    textAlign: 'right'
  },
  sectionText: {
    color: 'grey',
    fontSize: 13
  },
  readMoreContainer: {
    backgroundColor: '#8CB1FF',
    height: 30
  },
  readMoreText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 7,
    fontSize: 12
  }
});

export default InfoCard;
