import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const CompareUserCard = ({ userData }) => {
  return (
    <Layout>
      <Text>{userData.name}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default CompareUserCard;
