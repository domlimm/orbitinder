import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const TechTags = ({ tagsData }) => {
  return (
    <Layout style={styles.tagContainer}>
      {tagsData.map(function (tag, index) {
        return (
          <Button
            style={styles.tags}
            size='small'
            appearance='ghost'
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
  tags: { marginHorizontal: -5 }
});

export default TechTags;
