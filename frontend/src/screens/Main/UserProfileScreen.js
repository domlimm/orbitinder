import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button, Layout, Text, Card, Icon } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';
import { BackIcon, ContentCard } from '../../components/index';
import { userData } from '../../constants/userData';
import { TechTags } from '../../components/index';
import { InterestTags } from '../../components/index';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation, route }) => {
  const navigateEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const [profileData, setProfileData] = React.useState(() => {
    const initialState =
      typeof route.params == 'undefined' ? userData : route.params.profileData;
    return initialState;
  });

  React.useEffect(() => {
    if (route.params) {
      setProfileData(route.params.profileData);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <Layout>
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
              route.params
                ? styles.smallHeaderContainer
                : styles.headerContainer
            ]}
          >
            <Image
              style={[
                route.params ? styles.avatarImgNoMargin : styles.avatarImg
              ]}
              source={{ uri: profileData.img }}
            />
            <Layout style={styles.headerCaptions}>
              <Text style={styles.name}>{profileData.name}</Text>
              <Layout style={styles.subCaptionsContainer}>
                <Text style={styles.subCaptions}>{profileData.year}</Text>
                <Text style={styles.subCaptions}>{profileData.major}</Text>
              </Layout>
            </Layout>
          </Layout>
          <Layout style={styles.contentContainer}>
            <ContentCard type={'bio'} userData={profileData} />
            <Card style={styles.contentCard}>
              <Text style={styles.cardTitle}>AREAS OF INTEREST</Text>
              <InterestTags tagsData={profileData.interestedAreas} />
            </Card>

            <Layout style={styles.groupContainer}>
              <ContentCard type={'coding-exp-level'} userData={profileData} />
              <ContentCard type={'commitment'} userData={profileData} />
            </Layout>
            <Card style={styles.contentCard}>
              <Text style={styles.cardTitle}>TECHNOLOGIES</Text>
              <TechTags tagsData={profileData.technologies} />
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
    marginTop: 30,
    borderRadius: 70 / 2
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
  }
});

export default UserProfileScreen;
