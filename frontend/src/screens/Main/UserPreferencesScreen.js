import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import { MainTags, FloatingEdit } from '../../components/index';
import { useSelector } from 'react-redux';

const UserPreferencesScreen = ({ navigation }) => {
  const navigateEditPref = () => {
    navigation.navigate('EditPref');
  };

  const userData = useSelector(state => state.user.userData);
  const { commitment, degree, gender, sweExperience, year } =
    userData.preferences;
  const partialPreferences = {
    year,
    degree,
    commitment,
    gender,
    sweExperience
  };
  const techExp = userData.preferences.technologyExperience;

  const DBIcon = () => <Feather name='database' size={20} color='#407BFF' />;
  const GameIcon = () => (
    <Ionicons name='game-controller-outline' size={20} color='#407BFF' />
  );
  const MLIcon = () => <Octicons name='hubot' size={20} color='#407BFF' />;
  const MobileIcon = () => (
    <Feather name='smartphone' size={20} color='#407BFF' />
  );
  const WebIcon = () => <Feather name='globe' size={20} color='#407BFF' />;

  const ContentCard = props => (
    <Card style={styles.contentCard} status='basic' disabled>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <MainTags tagsData={props.data} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <Layout style={styles.contentContainer}>
          {Object.entries(partialPreferences).map(([key, value]) => {
            if (value.length > 0) {
              if (key === 'year') {
                return (
                  <ContentCard key={key} title={'YEAR OF STUDY'} data={year} />
                );
              } else if (key === 'degree') {
                return <ContentCard key={key} title={'MAJOR'} data={degree} />;
              } else if (key === 'commitment') {
                return (
                  <ContentCard
                    key={key}
                    title={'COMMITMENT'}
                    data={commitment.map(value => value.split(' ')[0])}
                  />
                );
              } else if (key === 'gender') {
                return <ContentCard key={key} title={'GENDER'} data={gender} />;
              } else if (key === 'sweExperience') {
                return (
                  <ContentCard
                    key={key}
                    title={'SWE EXPERIENCE LEVEL'}
                    data={sweExperience}
                  />
                );
              }
            }
          })}
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
                <Card
                  style={styles.contentCard}
                  key={displayHeader}
                  status='primary'
                  disabled
                >
                  <Layout style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardTitle}>{displayHeader}</Text>
                    <Button
                      size='tiny'
                      appearance='ghost'
                      status='basic'
                      accessoryRight={displayIcon}
                    ></Button>
                  </Layout>
                  <MainTags tagsData={value} />
                </Card>
              );
            }
          })}
        </Layout>
      </ScrollView>
      <FloatingEdit navigate={navigateEditPref} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10
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
    height: 270,
    alignItems: 'center',
    paddingTop: 20
  },
  avatarImg: {
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
    // fontFamily: 'Lato'
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentCard: {
    margin: 5,
    shadowColor: 'grey',
    shadowRadius: 4,
    marginTop: 5,
    width: '90%'
    // alignContent: 'center'
    // flexWrap: 'wrap'
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
    flexDirection: 'row'
  },
  cardGroup: {
    width: '50%',
    height: 100
  }
});

export default UserPreferencesScreen;
