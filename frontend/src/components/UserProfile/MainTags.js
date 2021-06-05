import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const MainTags = ({ tagsData }) => {
  return (
    <Layout style={styles.tagContainer}>
      {tagsData.map(function (tag, index) {
        return (
          <Button
            style={styles.tags}
            size='small'
            appearance='filled'
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
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    borderRadius: 10
  },
  tags: {
    marginRight: 5,
    marginVertical: 5
  }
});

export default MainTags;