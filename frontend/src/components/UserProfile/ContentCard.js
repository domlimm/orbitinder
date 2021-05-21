import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Card, Text } from '@ui-kitten/components';
import { InterestTags } from './InterestTags';

const ContentCard = ({ type, userData }) => {
  switch (type) {
    case 'bio':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>ABOUT ME</Text>
          <Text>{userData.bio}</Text>
        </Card>
      );
      break;
    case 'areas-of-interest':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
          <InterestTags tagsData={userData.interestedAreas} />
        </Card>
      );
      break;
    case 'coding-exp-level':
      return (
        // <Card style={styles.cardGroup}>
        //   <Text style={styles.cardTitle}>Coding Exp Level</Text>
        //   <InterestTags tagsData={[userData.codingExpLevel]} />
        // </Card>
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>Coding Exp Level</Text>
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
          >
            {userData.codingExpLevel}
          </Button>
        </Card>
      );
      break;
    case 'commitment':
      return (
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>Commitment</Text>
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
          >
            {userData.commitment}
          </Button>
        </Card>
      );
      break;
  }
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
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
  cardGroup: {
    width: '50%',
    height: 100
  }
});

export default ContentCard;
