import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

import { dummyUserData, partnerPref } from '../../constants/userData';
import {
  TechTags,
  InterestTags,
  BackIcon,
  ContentCard,
  FloatingEdit
} from '../../components/index';

const UserPreferencesScreen = ({ navigation }) => {
  const navigateEditPref = () => {
    navigation.navigate('EditPref');
  };

  const [techArray, setTechArray] = React.useState(
    partnerPref.tech.db.concat(
      partnerPref.tech.gamedev,
      partnerPref.tech.ml,
      partnerPref.tech.mobiledev,
      partnerPref.tech.webdev
    )
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
        <ScrollView>
          {/* <Layout style={styles.headerContainer}>
            <Layout style={styles.headerCaptions}>
              <Text style={styles.name}>Rebecca Black</Text>
              <Layout style={styles.subCaptionsContainer}>
                <Text style={styles.subCaptions}>Year 1</Text>
                <Text style={styles.subCaptions}>Business Analytics</Text>
              </Layout>
            </Layout>
          </Layout> */}
          <Layout style={styles.contentContainer}>
            {/* <ContentCard type={'bio'} userData={userData} /> */}
            <Card style={styles.contentCard} status='basic'>
              <Text style={styles.cardTitle}>YEAR OF STUDY</Text>
              <InterestTags tagsData={partnerPref.year} />
            </Card>
            <Card style={styles.contentCard} status='basic'>
              <Text style={styles.cardTitle}>MAJOR</Text>
              <InterestTags tagsData={partnerPref.degree} />
            </Card>
            <Card style={styles.contentCard} status='basic'>
              <Text style={styles.cardTitle}>COMMITMENT</Text>
              <InterestTags tagsData={partnerPref.commitment} />
            </Card>
            <Card style={styles.contentCard} status='basic'>
              <Text style={styles.cardTitle}>GENDER</Text>
              <InterestTags tagsData={partnerPref.gender} />
            </Card>
            <Card style={styles.contentCard} status='basic'>
              <Text style={styles.cardTitle}>SWE EXPERIENCE LEVEL</Text>
              <InterestTags tagsData={partnerPref.codingExpLevel} />
            </Card>
            {/* <Layout style={styles.groupContainer}>
              <ContentCard type={'coding-exp-level'} userData={userData} />
              <ContentCard type={'commitment'} userData={userData} />
            </Layout> */}
            <Card style={styles.contentCard}>
              <Text style={styles.cardTitle}>TECHNOLOGIES</Text>
              {/* <TechTags tagsData={techArray} /> */}
            </Card>
          </Layout>
        </ScrollView>
        <FloatingEdit navigate={navigateEditPref} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
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
    width: '90%',
    alignContent: 'center'
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
