import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const MainTags = ({ tagsData, firstWord, isArray, isCompare }) => {
  return (
    <Layout style={styles.tagContainer}>
      {isArray && isCompare ? (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {tagsData.map(function (tag, index) {
            return (
              <Button
                style={styles.tags}
                size='small'
                appearance='filled'
                status='basic'
                key={index}
              >
                {firstWord ? tag.replace(/ .*/, '') : tag}
              </Button>
            );
          })}
        </ScrollView>
      ) : isArray ? (
        tagsData.map(function (tag, index) {
          return (
            <Button
              style={styles.tags}
              size='small'
              appearance='filled'
              status='basic'
              key={index}
            >
              {firstWord ? tag.replace(/ .*/, '') : tag}
            </Button>
          );
        })
      ) : (
        <Button
          style={styles.tags}
          size='small'
          appearance='filled'
          status='basic'
        >
          {firstWord ? tagsData.replace(/ .*/, '') : tagsData}
        </Button>
      )}
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
