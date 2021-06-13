import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import IconBadge from 'react-native-icon-badge';
import { Foundation } from '@expo/vector-icons';

import MainTags from './MainTags';
import UserAvatar from './UserAvatar';

const InfoCard = ({ cardData, navProps }) => {
  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    if (cardData.imagePath !== undefined) {
      setImage(cardData.imagePath);
    }
  }, [cardData]);

  const handleReadMore = () => {
    navProps.navigation.navigate({
      name: 'TeamUpProfile',
      params: {
        profileData: cardData
      }
    });
  };

  const background = cardData.background;
  const name = cardData.name;
  const gender = cardData.gender;

  return (
    <Layout style={styles.cardContainer}>
      <Layout style={styles.headerContainer}>
        <IconBadge
          MainElement={
            <>
              {image.length > 0 ? (
                <Image style={styles.avatarImg} source={{ uri: image }} />
              ) : (
                <UserAvatar
                  style={styles.avatarImg}
                  name={cardData.name}
                  size={60}
                  fontSize={28}
                />
              )}
            </>
          }
          BadgeElement={
            <Foundation
              name={gender == 'Female' ? 'female-symbol' : 'male-symbol'}
              size={30}
              color={gender == 'Female' ? '#FF59A1' : '#00C1FF'}
              style={styles.genderIcon}
            />
          }
          IconBadgeStyle={styles.genderBadge}
        />
        <Layout style={styles.headerCaptions}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.subCaptions}>{background.degree}</Text>
          <Text style={styles.subCaptions}>{background.year}</Text>
          <Layout style={styles.subCaptionsContainer}></Layout>
        </Layout>
      </Layout>
      <Layout style={styles.contentContainer}>
        {background.biography.length > 0 && (
          <Text style={styles.sectionText}>{background.biography}</Text>
        )}
        {background.interests.length > 0 && (
          <Layout>
            <Text style={styles.sectionTitle}>INTERESTED AREAS</Text>
            <ScrollView horizontal={true}>
              <MainTags tagsData={background.interests} isArray={true} />
            </ScrollView>
          </Layout>
        )}

        <Layout style={{ flexDirection: 'column' }}>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.sectionTitle}>EXP LEVEL</Text>
            <Text style={styles.sectionTitleRight}>HAS IDEA?</Text>
          </Layout>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <MainTags tagsData={background.sweExperience} />
            <MainTags tagsData={background.idea} />
          </Layout>
        </Layout>
        <Layout style={{ flexDirection: 'column' }}>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.sectionTitle}>ORBITAL LEVEL</Text>
            <Text style={styles.sectionTitleRight}>COMMITMENT</Text>
          </Layout>
          <Layout
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <MainTags tagsData={background.achievement} />
            <MainTags tagsData={background.commitment} firstWord={true} />
          </Layout>
        </Layout>
      </Layout>
      <TouchableOpacity
        onPress={handleReadMore}
        style={styles.readMoreContainer}
      >
        <Text style={styles.readMoreText}>VIEW DETAILS</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: 540,
    width: '90%',
    // marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5
  },
  headerContainer: {
    backgroundColor: '#407BFF',
    height: 150,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // shadowColor: 'grey',
    // shadowOffset: { height: 5, width: 5 },
    // shadowOpacity: 1,
    marginTop: 15
  },
  headerCaptions: {
    marginVertical: 5,
    backgroundColor: '#407BFF',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  subCaptionsContainer: {
    backgroundColor: '#407BFF',
    alignItems: 'flex-start',
    marginTop: 0,
    flexDirection: 'row'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginVertical: 1,
    letterSpacing: 1,
    textAlign: 'center'
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  sectionTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13
  },
  sectionTitleRight: {
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'right',
    marginRight: 5
  },
  sectionText: {
    color: 'grey',
    fontSize: 13
  },
  readMoreContainer: {
    backgroundColor: '#8CB1FF',
    height: 30,
    width: 120,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5
  },
  readMoreText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 7,
    fontSize: 12
  },
  genderIcon: {
    // marginTop: 4,
    // alignItems: 'center'
  },
  genderBadge: {
    width: 30,
    height: 30,
    top: 8,
    right: -8,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)'
    backgroundColor: 'transparent'
  }
});

export default InfoCard;
