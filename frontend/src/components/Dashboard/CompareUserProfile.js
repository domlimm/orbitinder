import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Card, Button, Divider } from '@ui-kitten/components';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import ContentCard from '../UserProfile/ContentCard';
import MainTags from '../UserProfile/MainTags';

const CompareUserProfile = ({ userData }) => {
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
    <Layout style={styles.contentContainer}>
      <Text>{userData.name}</Text>
      {userData.background.interests.length > 0 && (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>INTERESTED AREAS</Text>
          <MainTags tagsData={userData.background.interests} isArray={true} />
        </Card>
      )}
      <ContentCard
        type={'coding-exp-level'}
        data={userData.background.sweExperience}
      />
      <ContentCard type={'commitment'} data={userData.background.commitment} />
      <ContentCard
        type={'orbitalLevel'}
        data={userData.background.achievement}
      />
      <ContentCard type={'hasIdea'} data={userData.background.idea} />
      {!isTechExpEmpty && (
        <Card style={styles.contentCard} disabled>
          <Text style={styles.cardTitle}>TECHNOLOGIES</Text>

          {Object.entries(techExp).map(([key, value]) => {
            if (value.length > 0) {
              let displayHeader, displayIcon;

              if (key === 'game') {
                displayHeader = 'GAME DEVELOPMENT';
                displayIcon = GameIcon;
              } else if (key === 'machineLearning') {
                displayHeader = 'MACHINE LEARNING';
                displayIcon = MLIcon;
              } else if (key === 'mobile') {
                displayHeader = 'MOBILE DEVELOPMENT';
                displayIcon = MobileIcon;
              } else if (key === 'web') {
                displayHeader = 'WEB DEVELOPMENT';
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
    flex: 1,
    marginBottom: 5
  },
  contentCard: {
    marginHorizontal: 5,
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
  tags: {
    marginRight: 5
  },
  techContainer: {
    borderRadius: 10,
    marginVertical: 5
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

export default CompareUserProfile;
