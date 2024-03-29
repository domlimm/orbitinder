import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Card, Text } from '@ui-kitten/components';

import MainTags from './MainTags';

const { width } = Dimensions.get('window');

const ContentCard = ({ type, data }) => {
  switch (type) {
    case 'bio':
      return (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>ABOUT ME</Text>
          <Text>{data}</Text>
        </Card>
      );
    case 'areas-of-interest':
      return (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
          <MainTags tagsData={data} isArray={true} />
        </Card>
      );
    case 'coding-exp-level':
      return (
        <Card style={styles.cardGroup} disabled>
          <Text style={styles.cardTitle}>EXP. LEVEL</Text>
          <Button size='small' appearance='outline' status='basic'>
            {data}
          </Button>
        </Card>
      );
    case 'commitment':
      return (
        <Card style={styles.cardGroup} disabled>
          <Text style={styles.cardTitle}>COMMITMENT</Text>
          <Button size='small' appearance='outline' status='basic'>
            {data.split(' ')[0]}
          </Button>
        </Card>
      );
    case 'orbitalLevel':
      return (
        <Card style={styles.cardGroup} disabled>
          <Text style={styles.cardTitle}>ORBITAL LEVEL</Text>
          <Button size='small' appearance='outline' status='basic'>
            {data}
          </Button>
        </Card>
      );
    case 'hasIdea':
      return (
        <Card style={styles.cardGroup} disabled>
          <Text style={styles.cardTitle}>HAS AN IDEA?</Text>
          <Button size='small' appearance='outline' status='basic'>
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
