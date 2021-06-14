import React, { Fragment } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button, Card, Text, Icon } from '@ui-kitten/components';

import UserAvatar from '../UserProfile/UserAvatar';

const RequestItem = ({ name, imagePath, year, degree, biography }) => {
  const AcceptIcon = props => <Icon {...props} name='checkmark-outline' />;
  const RejectIcon = props => <Icon {...props} name='close-outline' />;

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        {imagePath.length > 0 ? (
          <Image source={{ uri: imagePath }} style={styles.avatar} />
        ) : (
          <UserAvatar name={name} size={50} fontSize={22} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text category='h6' style={styles.name}>
            {name}
          </Text>
          <Text>{`${year} - ${degree}`}</Text>
        </View>
      </View>
    </View>
  );

  const Footer = props => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        accessoryLeft={AcceptIcon}
        size='small'
        status='success'
      />
      <Button
        style={styles.footerControl}
        accessoryLeft={RejectIcon}
        size='small'
        status='danger'
      />
    </View>
  );

  return (
    <Fragment>
      <Card
        style={styles.cardContainer}
        header={Header}
        footer={Footer}
        status='primary'
      >
        <Text>{biography}</Text>
      </Card>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerControl: {
    marginHorizontal: 2
  },
  cardContainer: {
    alignSelf: 'center',
    marginVertical: 6,
    width: '96%'
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
  }
});

export default RequestItem;
