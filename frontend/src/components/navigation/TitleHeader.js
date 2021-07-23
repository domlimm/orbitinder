import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text
} from '@ui-kitten/components';

const TitleHeader = ({ navProps }) => {
  const BackIcon = props => (
    <Icon
      {...props}
      name='arrow-back'
      fill='#407bff'
      style={[props.style, { width: 32, height: 32 }]}
    />
  );

  const navigateBack = () => {
    if (navProps.replaceRoutePop != undefined) {
      if (navProps.replaceRoutePop) {
        navProps.navigation.pop();
      }
    } else {
      navProps.navigation.goBack();
    }
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderTitle = () => (
    <Text style={styles.titleHeader}>{navProps.title}</Text>
  );

  const DrawerIcon = props => (
    <Icon
      {...props}
      name='menu-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
      onPress={() => navProps.navigation.openDrawer()}
    />
  );
  const renderMenuIcon = () => <TopNavigationAction icon={DrawerIcon} />;

  if (navProps.needBackNav) {
    return (
      <TopNavigation
        accessoryLeft={BackAction}
        alignment='center'
        title={renderTitle}
      />
    );
  } else {
    if (navProps.needMenuNav) {
      return (
        <TopNavigation
          title={renderTitle}
          alignment='center'
          accessoryLeft={renderMenuIcon}
        />
      );
    } else {
      return <TopNavigation title={renderTitle} alignment='center' />;
    }
  }
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: '5%'
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default TitleHeader;
