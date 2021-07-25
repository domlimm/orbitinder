import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Card, Button, Divider } from '@ui-kitten/components';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import MainTags from '../UserProfile/MainTags';

const CompareUserProfile = ({ userData, dynamicWidth, dynamicFlex }) => {
  const background = userData.background;
  const techExp = background.technologyExperience;
  const { database, game, machineLearning, mobile, web } = techExp;
  const isTechExpEmpty =
    database.length === 0 &&
    game.length === 0 &&
    machineLearning.length === 0 &&
    mobile.length === 0 &&
    web.length === 0;

  const DBIcon = () => <Feather name='database' size={20} color='#407BFF' />;
  const GameIcon = () => (
    <Ionicons name='game-controller-outline' size={20} color='#407BFF' />
  );
  const MLIcon = () => <Octicons name='hubot' size={20} color='#407BFF' />;
  const MobileIcon = () => (
    <Feather name='smartphone' size={20} color='#407BFF' />
  );
  const WebIcon = () => <Feather name='globe' size={20} color='#407BFF' />;

  return (
    <Layout
      style={[
        styles.contentContainer,
        {
          flex: dynamicFlex,
          width: dynamicWidth
        }
      ]}
    >
      <Text>{userData.name}</Text>
      {userData.background.interests.length > 0 && (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>INTERESTED AREAS</Text>
          <MainTags
            tagsData={background.interests}
            isArray={true}
            isCompare={true}
          />
        </Card>
      )}
      <Card style={styles.cardGroup} disabled>
        <Text style={styles.cardTitle}>EXP. LEVEL</Text>
        <Button size='small' appearance='outline' status='basic'>
          {userData.background.sweExperience}
        </Button>
      </Card>
      <Card style={styles.cardGroup} disabled>
        <Text style={styles.cardTitle}>COMMITMENT</Text>
        <Button size='small' appearance='outline' status='basic'>
          {userData.background.commitment.split(' ')[0]}
        </Button>
      </Card>
      <Card style={styles.cardGroup} disabled>
        <Text style={styles.cardTitle}>ORBITAL LEVEL</Text>
        <Button size='small' appearance='outline' status='basic'>
          {userData.background.achievement}
        </Button>
      </Card>
      <Card style={styles.cardGroup} disabled>
        <Text style={styles.cardTitle}>HAS AN IDEA?</Text>
        <Button size='small' appearance='outline' status='basic'>
          {userData.background.idea}
        </Button>
      </Card>
      {!isTechExpEmpty && (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>TECHNOLOGIES</Text>

          {Object.entries(techExp).map(([key, value]) => {
            if (value.length > 0) {
              let displayHeader, displayIcon;

              if (key === 'game') {
                displayHeader = 'GAME DEV.';
                displayIcon = GameIcon;
              } else if (key === 'machineLearning') {
                displayHeader = 'MACHINE LEARNING';
                displayIcon = MLIcon;
              } else if (key === 'mobile') {
                displayHeader = 'MOBILE DEV.';
                displayIcon = MobileIcon;
              } else if (key === 'web') {
                displayHeader = 'WEB DEV.';
                displayIcon = WebIcon;
              } else if (key === 'database') {
                displayHeader = 'DATABASE';
                displayIcon = DBIcon;
              }

              return (
                <Layout style={styles.techContainer} key={displayHeader}>
                  <Divider />
                  <Button
                    size='large'
                    appearance='ghost'
                    status='basic'
                    accessoryRight={displayIcon}
                  >
                    {displayHeader}
                  </Button>
                  <Layout style={styles.tagContainer}>
                    {value.map(tech => (
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
                </Layout>
              );
            }
          })}
        </Card>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    margin: 4
  },
  contentCard: {
    marginTop: 7,
    shadowColor: 'grey',
    shadowRadius: 4
  },
  cardTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginVertical: 5
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  techContainer: {
    borderRadius: 10,
    marginVertical: 5
  },
  tags: {
    marginHorizontal: -5
  },
  cardGroup: {
    marginTop: 7,
    height: 100,
    shadowColor: 'grey',
    shadowRadius: 4
  }
});

export default CompareUserProfile;
