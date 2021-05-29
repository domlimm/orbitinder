import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';
import { InterestTags } from './InterestTags';

const { width } = Dimensions.get('window');

const ContentCard = ({ type, userData }) => {
  switch (type) {
    case 'bio':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>ABOUT ME</Text>
          <Text>{userData.bio}</Text>
        </Card>
      );
    case 'areas-of-interest':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
          <InterestTags tagsData={userData.interestedAreas} />
        </Card>
      );
    case 'coding-exp-level':
      return (
        // <Card style={styles.cardGroup}>
        //   <Text style={styles.cardTitle}>Coding Exp Level</Text>
        //   <InterestTags tagsData={[userData.codingExpLevel]} />
        // </Card>
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>EXP. LEVEL</Text>
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
    case 'commitment':
      return (
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>COMMITMENT</Text>
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
  }
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  contentCard: {
    marginHorizontal: 5,
    shadowColor: 'grey',
    shadowRadius: 4,
    marginVertical: 4
  },
  cardTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 5
  },
  cardGroup: {
    marginVertical: 4,
    width: width * 0.48,
    height: 100,
    shadowColor: 'grey',
    shadowRadius: 4
  }
});

export default ContentCard;
