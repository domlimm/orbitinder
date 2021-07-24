import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Foundation } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';

import UserAvatar from '../UserProfile/UserAvatar';

const { width, height } = Dimensions.get('window');

const CompareUserCard = ({ userData }) => {
  return (
    <Layout style={styles.parentContainer}>
      <View style={styles.actionContainer}>
        <View style={styles.checkContainer}></View>
      </View>
      <View style={styles.contentContainer}>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    height: height * 0.26,
    width: width * 0.9,
    backgroundColor: '#407BFF',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  checkContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  avatarImg: {
    width: 68,
    height: 68,
    borderRadius: 34,
    shadowColor: 'grey',
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1
  },
  genderBadgeUserProfile: {
    width: 30,
    height: 30,
    top: -10,
    right: -3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  headerCaptions: {
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white'
  },
  subCaptions: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 1,
    textAlign: 'center'
  }
});

export default CompareUserCard;
