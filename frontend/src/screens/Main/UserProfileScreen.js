import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import { ContentCard, InterestTags } from '../../components/index';
import { dummyUserData } from '../../constants/userData';

const UserProfileScreen = ({ navigation, route }) => {
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

  const navigateEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <ScrollView>
          <Layout
            style={[
              route.params
                ? styles.smallHeaderContainer
                : styles.headerContainer
            ]}
          >
            <Image
              style={[
                route.params ? styles.avatarImgNoMargin : styles.avatarImg
              ]}
              source={{ uri: dummyUserData.img }}
            />
            <Layout style={styles.headerCaptions}>
              <Text style={styles.name}>{userData.name}</Text>
              <Layout style={styles.subCaptionsContainer}>
                <Text style={styles.subCaptions}>{background.year}</Text>
                <Text style={styles.subCaptions}>{background.degree}</Text>
              </Layout>
            </Layout>
          </Layout>
          <Layout style={styles.contentContainer}>
            <ContentCard type={'bio'} data={background.biography} />
            <Card style={styles.contentCard}>
              <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
              <InterestTags tagsData={dummyUserData.interestedAreas} />
            </Card>

            <Layout style={styles.groupContainer}>
              <ContentCard
                type={'coding-exp-level'}
                data={background.sweExperience}
              />
              <ContentCard type={'commitment'} data={background.commitment} />
            </Layout>

            <Card style={styles.contentCard}>
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
          </Layout>
        </ScrollView>
        {!route.params && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.touchableOpacityStyle}
            onPress={navigateEditProfile}
          >
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.floatingButtonStyle}
            />
          </TouchableOpacity>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7'
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
    height: 200,
    alignItems: 'center'
  },
  smallHeaderContainer: {
    flex: 1,
    backgroundColor: '#407BFF',
    height: 170,
    alignItems: 'center'
  },
  avatarImg: {
    width: 70,
    height: 70,
    borderRadius: 32,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    marginTop: 30
  },
  avatarImgNoMargin: {
    width: 70,
    height: 70,
    borderRadius: 32,
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
    marginVertical: 1,
    letterSpacing: 1,
    marginRight: 10
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
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'flex-start'
  },
  iconContainer: {
    backgroundColor: '#407bff'
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

export default UserProfileScreen;
