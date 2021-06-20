import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Pressable
} from 'react-native';
import {
  Layout,
  Text,
  Card,
  Button,
  Icon,
  Divider
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Feather, Ionicons, Octicons, Foundation } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';
import dayjs from 'dayjs';

import {
  ContentCard,
  MainTags,
  FloatingEdit,
  UserAvatar
} from '../../components/index';

const UserProfileScreen = ({ navigation, route }) => {
  const userData = useSelector(state => state.user.userData);
  const background = userData.background;
  const techExp = background.technologyExperience;
  const updatedAt = dayjs(userData.updatedAt).format(
    'dddd D MMM YY, h:mm:ss A'
  );
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

  const navigateEditProfile = () => {
    navigation.navigate('EditNavigator', { screen: 'EditProfile' });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <Layout style={styles.iconContainer}>
          {route.params && (
            <Icon
              name='arrow-back'
              onPress={navigateBack}
              fill='white'
              style={styles.backIcon}
            />
          )}
        </Layout>
        <Layout
          style={[
            route.params ? styles.smallHeaderContainer : styles.headerContainer
          ]}
        >
          <IconBadge
            MainElement={
              <Pressable onPress={navigateEditProfile}>
                {userData.imagePath.length > 0 ? (
                  <Image
                    style={[
                      route.params ? styles.avatarImgNoMargin : styles.avatarImg
                    ]}
                    source={{ uri: userData.imagePath }}
                  />
                ) : (
                  <UserAvatar
                    style={[
                      route.params ? styles.avatarImgNoMargin : styles.avatarImg
                    ]}
                    name={userData.name}
                    size={70}
                    fontSize={28}
                  />
                )}
              </Pressable>
            }
            BadgeElement={
              <Foundation
                name={
                  userData.gender == 'Female' ? 'female-symbol' : 'male-symbol'
                }
                size={24}
                color={userData.gender == 'Female' ? '#FF59A1' : '#00C1FF'}
                style={styles.genderIcon}
              />
            }
            IconBadgeStyle={[
              route.params
                ? styles.genderBadgeViewDetails
                : styles.genderBadgeUserProfile
            ]}
          />

          <Layout style={styles.headerCaptions}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.subCaptions}>{background.degree}</Text>
            <Text style={styles.subCaptions}>{background.year}</Text>
          </Layout>
        </Layout>
        <Layout style={styles.contentContainer}>
          {background.biography.length > 0 && (
            <ContentCard type={'bio'} data={background.biography} />
          )}
          {background.interests.length > 0 && (
            <Card style={styles.contentCard} disabled>
              <Text style={styles.cardTitle}>INTERESTED AREAS</Text>
              <MainTags tagsData={background.interests} isArray={true} />
            </Card>
          )}

          <Layout style={styles.groupContainer}>
            <ContentCard
              type={'coding-exp-level'}
              data={background.sweExperience}
            />
            <ContentCard type={'commitment'} data={background.commitment} />
          </Layout>
          <Layout style={styles.groupContainer}>
            <ContentCard type={'orbitalLevel'} data={background.achievement} />
            <ContentCard type={'hasIdea'} data={background.idea} />
          </Layout>
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
          <Text
            style={styles.updatedText}
            category='label'
          >{`Last Updated: ${updatedAt}`}</Text>
        </Layout>
      </ScrollView>
      {!route.params && <FloatingEdit navigate={navigateEditProfile} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  icon: {
    width: 25,
    height: 25,
    justifyContent: 'flex-start',
    backgroundColor: '#407BFF',
    flex: 1
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#407BFF',
    height: 210,
    alignItems: 'center'
  },
  smallHeaderContainer: {
    flex: 1,
    backgroundColor: '#407BFF',
    height: 180,
    alignItems: 'center'
  },
  avatarImg: {
    width: 70,
    height: 70,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    marginTop: 30,
    borderRadius: 35
  },
  avatarImgNoMargin: {
    width: 70,
    height: 70,
    borderRadius: 35,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1
  },
  headerCaptions: {
    marginVertical: 10,
    backgroundColor: '#407BFF',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
  subCaptionsContainer: {
    backgroundColor: '#407BFF',
    alignItems: 'flex-start',
    marginTop: 5,
    flexDirection: 'row'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 1,
    textAlign: 'center'
  },
  linksIcons: {
    backgroundColor: '#407BFF',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardGroup: {
    width: '50%',
    height: 100
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'flex-start'
  },
  iconContainer: {
    backgroundColor: '#407BFF'
  },
  genderIcon: {
    marginTop: 4
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
  },
  genderBadgeUserProfile: {
    width: 30,
    height: 30,
    top: 20,
    right: -3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  genderBadgeViewDetails: {
    width: 30,
    height: 30,
    top: -5,
    right: -3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  updatedText: {
    marginHorizontal: 15,
    marginVertical: 10
  }
});

export default UserProfileScreen;
