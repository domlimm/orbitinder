import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const TechTags = () => {
  const userData = useSelector(state => state.user.userData);
  const background = userData.background;
  const techExp = background.technologyExperience;

  const DBIcon = () => <Feather name='database' size={24} color='#407BFF' />;
  const GameIcon = () => (
    <Ionicons name='game-controller-outline' size={24} color='#407BFF' />
  );
  const MLIcon = () => <Octicons name='hubot' size={24} color='#407BFF' />;
  const MobileIcon = () => (
    <Feather name='smartphone' size={24} color='#407BFF' />
  );
  const WebIcon = () => <Feather name='globe' size={24} color='#407BFF' />;

  return (
    <Layout style={styles.contentContainer}>
      {Object.entries(techExp).map(([key, value]) => {
        if (value.length > 0) {
          let displayHeader, displayIcon;

          if (key === 'game') {
            displayHeader = 'game development';
            displayIcon = GameIcon;
          } else if (key === 'machineLearning') {
            displayHeader = 'machine learning';
            displayIcon = MLIcon;
          } else if (key === 'mobile') {
            displayHeader = 'mobile development';
            displayIcon = MobileIcon;
          } else if (key === 'web') {
            displayHeader = 'web development';
            displayIcon = WebIcon;
          } else {
            displayHeader = key;
            displayIcon = DBIcon;
          }

          return (
            <Layout style={styles.tagContainer} key={displayHeader}>
              {value.forEach(tech => (
                <Button
                  style={styles.tags}
                  size='small'
                  appearance='ghost'
                  status='basic'
                  key={tech}
                >
                  {tech}
                </Button>
              ))}
            </Layout>
          );
        }
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 10
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10
  },
  tags: {
    marginHorizontal: -5
  }
});

export default TechTags;
