import React, { Fragment } from 'react';
import { StyleSheet, Image, View, Alert, Platform } from 'react-native';
import { Button, Card, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../../redux/actions/user';
import UserAvatar from '../UserProfile/UserAvatar';

const RequestItem = ({
  receiverData,
  senderData,
  type,
  index,
  cancelToastHandler,
  viewOnly,
  viewProfile
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recentLikes = useSelector(state => state.user.userData.recentLikes);

  const showProfile = () => {
    navigation.navigate('ChatStackNavigator', {
      screen: 'UserProfile',
      params: { profileData: senderData }
    });
  };

  const AcceptIcon = props => (
    <Icon {...props} name='checkmark-outline' fill='white' />
  );
  const RejectIcon = props => (
    <Icon {...props} name='close-outline' fill='white' />
  );

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        {senderData.imagePath.length > 0 ? (
          <Image source={{ uri: senderData.imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={senderData.name} size={50} fontSize={22} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text category='h6' style={styles.name}>
            {senderData.name}
          </Text>
          <Text>{`${senderData.background.year} - ${senderData.background.degree}`}</Text>
        </View>
      </View>
    </View>
  );

  const acceptHandler = () => {
    Alert.alert(
      'Are you sure of your selection?',
      `Accepting this request creates a new chat between you and ${senderData.name}. Thereafter, it will be removed.`,
      [
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            dispatch(
              userActions.addAcceptChatRequest(
                senderData.id,
                receiverData,
                senderData
              )
            );
            dispatch(userActions.removeLikedBy(senderData.id));
          }
        },
        { text: 'Cancel', style: 'cancel', onPress: () => {} }
      ]
    );
  };

  const rejectHandler = () => {
    Alert.alert(
      'Are you sure of your selection?',
      `Declining removes this request permanently. You will have to wait for ${senderData.name} to send you another one, if ever.`,
      [
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(userActions.rejectChatRequest(senderData.id));
            dispatch(userActions.removeLikedBy(senderData.id));
          }
        },
        { text: 'Cancel', style: 'cancel', onPress: () => {} }
      ]
    );
  };

  const cancelHandler = () => {
    Alert.alert(
      'Are you sure of your selection?',
      `Cancelling your sent request will require you to send ${senderData.name} another one in the future.`,
      [
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            const newRecentLikes = recentLikes.filter(
              user => user.id !== senderData.id
            );
            newRecentLikes.sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );

            dispatch(userActions.cancelRequest(senderData.id, newRecentLikes));
            cancelToastHandler(senderData.name);
          }
        },
        { text: 'Cancel', style: 'cancel', onPress: () => {} }
      ]
    );
  };

  return (
    <Fragment>
      <Card
        style={styles.cardContainer}
        header={Header}
        status={
          viewOnly
            ? 'primary'
            : type === 'active' && index === 0
            ? 'success'
            : type === 'sent' && index === 0
            ? 'warning'
            : null
        }
        onPress={viewOnly ? () => viewProfile(senderData) : showProfile}
      >
        <Text>
          {senderData.background.biography.length > 0
            ? senderData.background.biography.length > 200
              ? `${senderData.background.biography.substring(0, 200)}...`
              : senderData.background.biography
            : 'Apparently, this user prefers to keep an air of mystery about them.'}
        </Text>
        {viewOnly && (
          <Text category='label' style={styles.timestamp}>
            {senderData.timestamp}
          </Text>
        )}
        {type === 'active' && !viewOnly && !receiverData.matched ? (
          <View style={styles.footerContainer}>
            <Button
              style={styles.footerControl}
              accessoryLeft={AcceptIcon}
              size='small'
              status='success'
              onPress={acceptHandler}
            />
            <Button
              style={styles.footerControl}
              accessoryLeft={RejectIcon}
              size='small'
              status='danger'
              onPress={rejectHandler}
            />
          </View>
        ) : type === 'sent' && !viewOnly && !receiverData.matched ? (
          <View style={styles.footerContainer}>
            <Button
              style={styles.footerControl}
              size='small'
              status='danger'
              onPress={cancelHandler}
            >
              CANCEL
            </Button>
          </View>
        ) : null}
      </Card>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 26
  },
  footerControl: {
    marginHorizontal: 2
  },
  cardContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  avatarContainer: {
    flex: 0.2,
    justifyContent: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  detailsContainer: {
    flex: 0.8,
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold'
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginTop: 20,
    fontWeight: 'bold'
  }
});

export default RequestItem;
