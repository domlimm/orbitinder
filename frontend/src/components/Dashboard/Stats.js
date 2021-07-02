import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Icon, Layout, Text } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

const Stats = ({ userData }) => {
  const LikeIcon = () => (
    <View style={styles.iconContainer}>
      <Icon style={styles.icon} fill='#224F60' name='heart-outline' />
    </View>
  );

  const DislikeIcon = () => (
    <View style={styles.iconContainer}>
      <Icon style={styles.icon} fill='#530821' name='slash-outline' />
    </View>
  );

  const StatCard = ({ type }) => (
    <Layout
      style={[
        styles.statCard,
        type === 'likes' ? styles.likes : styles.dislikes
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.figureContainer}>
          <Text category='h1' style={styles.statFigure}>
            {type === 'likes'
              ? userData.likes.length
              : userData.dislikes.length}
          </Text>
        </View>
        <View style={styles.iconFooter}>
          {type === 'likes' ? <LikeIcon /> : <DislikeIcon />}
        </View>
      </View>
      <Text category='h6' style={styles.statTitle}>
        {type}
      </Text>
    </Layout>
  );

  return (
    <View style={styles.parentContainer}>
      <StatCard type='likes' />
      <StatCard type='dislikes' />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20
  },
  statCard: {
    width: width * 0.5 - 28,
    height: height * 0.16,
    marginHorizontal: 8,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
  },
  likes: {
    backgroundColor: '#B2CAC8'
  },
  dislikes: {
    backgroundColor: '#CD675B'
  },
  statTitle: {
    textTransform: 'uppercase',
    marginTop: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statFigure: {
    fontWeight: 'bold'
  },
  figureContainer: {
    width: '80%'
  },
  iconFooter: {
    width: '20%'
  },
  iconContainer: {
    borderRadius: 16,
    padding: 5,
    backgroundColor: '#FFF',
    height: 42,
    width: 42,
    alignSelf: 'flex-end'
  },
  icon: {
    height: 32,
    width: 32
  }
});

export default Stats;
