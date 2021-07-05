import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Stats = () => {
  const [likesCount, setLikesCount] = useState('');
  const [dislikesCount, setDislikesCount] = useState('');
  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
    if (userData.likes !== undefined) {
      setLikesCount(userData.likes.length);
    }

    if (userData.dislikes !== undefined) {
      setDislikesCount(userData.dislikes.length);
    }
  }, [userData]);

  const LikeIcon = () => (
    <View style={styles.iconContainer}>
      <Feather name='smile' size={32} color='#224F60' />
    </View>
  );

  const DislikeIcon = () => (
    <View style={styles.iconContainer}>
      <Feather name='thumbs-down' size={32} color='#530821' />
    </View>
  );

  const StatCard = ({ type }) => (
    <Layout style={styles.statCard}>
      <View style={styles.headerContainer}>
        <View style={styles.figureContainer}>
          <Text category='h1' style={styles.statFigure}>
            {type === 'likes' ? likesCount : dislikesCount}
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
      <Text category='h5' style={styles.headerTitle}>
        Your Insights
      </Text>
      <View style={styles.statCardsContainer}>
        <StatCard type='likes' />
        <StatCard type='dislikes' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    margin: 20
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  statCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statCard: {
    width: width * 0.5 - 28,
    height: height * 0.16,
    marginHorizontal: 8,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
  },
  // likes: {
  //   backgroundColor: '#B2CAC8'
  // },
  // dislikes: {
  //   backgroundColor: '#CD675B'
  // },
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
    backgroundColor: '#FFF',
    height: 46,
    width: 46,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 32,
    width: 32
  }
});

export default Stats;
