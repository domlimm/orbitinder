import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const InterestTags = ({ tagsData }) => {
  return (
    <Layout style={styles.tagContainer}>
      {tagsData.map(function (tag, index) {
        return (
          <Button
            style={styles.tags}
            size='small'
            appearance='outline'
            status='basic'
            key={index}
          >
            {tag}
          </Button>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  tags: {
    marginRight: 5
  }
});

export default InterestTags;