import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';

import { InterestTags } from './InterestTags';
import { dummyUserData } from '../../constants/userData';

const { width } = Dimensions.get('window');

const ContentCard = ({ type, data }) => {
  switch (type) {
    case 'bio':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>ABOUT ME</Text>
          <Text>{data}</Text>
        </Card>
      );
    case 'areas-of-interest':
      return (
        <Card style={styles.contentCard}>
          <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
          <InterestTags tagsData={dummyUserData.interestedAreas} />
        </Card>
      );
    case 'coding-exp-level':
      return (
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>EXP. LEVEL</Text>
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
          >
            {data}
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
            {data}
          </Button>
        </Card>
      );
    case 'orbitalLevel':
      return (
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>ORBITAL LEVEL</Text>
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
          >
            {data}
          </Button>
        </Card>
      );
    case 'hasIdea':
      return (
        <Card style={styles.cardGroup}>
          <Text style={styles.cardTitle}>HAS IDEA?</Text>
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
          >
            {data}
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
    marginTop: 7
  },
  cardTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 5
  },
  cardGroup: {
    marginTop: 7,
    width: width * 0.48,
    height: 100,
    shadowColor: 'grey',
    shadowRadius: 4
  }
});

export default ContentCard;
