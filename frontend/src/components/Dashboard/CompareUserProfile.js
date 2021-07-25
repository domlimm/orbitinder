import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Layout, Text, Card, Button, Divider } from '@ui-kitten/components';
import { Feather, Ionicons, Octicons, Foundation } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';

import MainTags from '../UserProfile/MainTags';
import UserAvatar from '../UserProfile/UserAvatar';

const { width, height } = Dimensions.get('window');

const CompareUserProfile = ({
  userData,
  dynamicWidth,
  dynamicFlex,
  double
}) => {
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
          flex: dynamicFlex
        }
      ]}
    >
      <View style={styles.headerContainer}>
        <IconBadge
          MainElement={
            <>
              {userData.imagePath.length > 0 ? (
                <Image
                  style={styles.avatarImg}
                  source={{ uri: userData.imagePath }}
                />
              ) : (
                <UserAvatar
                  style={styles.avatarImg}
                  name={userData.name}
                  size={70}
                  fontSize={28}
                />
              )}
            </>
          }
          BadgeElement={
            <Foundation
              name={
                userData.gender == 'Female' ? 'female-symbol' : 'male-symbol'
              }
              size={24}
              color={userData.gender == 'Female' ? '#FF59A1' : '#00C1FF'}
            />
          }
          IconBadgeStyle={styles.genderBadgeUserProfile}
        />
        <View style={styles.headerCaptions}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.subCaptions}>{userData.background.degree}</Text>
          <Text style={styles.subCaptions}>{userData.background.year}</Text>
        </View>
      </View>
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
                displayHeader = double ? 'GAME DEV.' : 'GAME DEVELOPMENT';
                displayIcon = GameIcon;
              } else if (key === 'machineLearning') {
                displayHeader = 'MACHINE LEARNING';
                displayIcon = MLIcon;
              } else if (key === 'mobile') {
                displayHeader = double ? 'MOBILE DEV.' : 'MOBILE DEVELOPMENT';
                displayIcon = MobileIcon;
              } else if (key === 'web') {
                displayHeader = double ? 'WEB DEV.' : 'WEB DEVELOPMENT';
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
    marginVertical: 6,
    marginHorizontal: 4
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#407BFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1
  },
  genderBadgeUserProfile: {
    width: 20,
    height: 20,
    top: -10,
    right: -3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  headerCaptions: {
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 1,
    textAlign: 'center'
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
    height: height * 0.14,
    shadowColor: 'grey',
    shadowRadius: 4
  }
});

export default CompareUserProfile;
