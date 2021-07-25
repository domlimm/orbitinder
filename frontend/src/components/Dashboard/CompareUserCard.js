import React from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Foundation } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';
import { Feather } from '@expo/vector-icons';

import UserAvatar from '../UserProfile/UserAvatar';

const { width, height } = Dimensions.get('window');

const CompareUserCard = ({
  userData,
  userId,
  selectedUsers,
  selectedHandler
}) => {
  const CheckIcon = () => <Feather name='check' size={24} color='white' />;

  const onPressHandler = () => {
    selectedHandler(userId);
  };

  return (
    <Layout style={styles.parentContainer}>
      <View style={styles.actionContainer}>
        <Pressable
          style={[
            styles.checkContainer,
            selectedUsers?.includes(userId) && { backgroundColor: '#3D9A12' }
          ]}
          onPress={onPressHandler}
        >
          {selectedUsers?.includes(userId) && <CheckIcon />}
        </Pressable>
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
    height: height * 0.3,
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
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 1,
    textAlign: 'center'
  }
});

export default CompareUserCard;
