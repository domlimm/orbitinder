import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Swiper from 'react-native-deck-swiper';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { SafeAreaView } from 'react-native-safe-area-context';

import firebase from '../../firebase';
import { InfoCard, TitleHeader } from '../../components/index';
import { scoreUsers, processPrefs, sortScores } from '../../utils/ScoreUsers';

const RecoUserScreen = ({ navigation, route }) => {
  const usersData = useSelector(state => state.users.usersData);
  const currUser = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const [viewHeight, setViewHeight] = React.useState();
  const [recoData, setRecoData] = React.useState([]);

  const navProps = {
    title: 'Recommended Users',
    navigation: navigation,
    needBackNav: true,
    needMenuNav: false,
    replaceRoutePop: true // unmount screen when navigating back
  };

  React.useEffect(() => {
    console.log('on mount');
    console.log(route.params.recoUsersData);
    const recoUsersListener = firebase
      .firestore()
      .collection('users')
      .where(
        firebase.firestore.FieldPath.documentId(),
        'in',
        route.params.recoUsersData
      )
      .onSnapshot(querySnapshot => {
        let recousersData = [];

        querySnapshot.forEach(doc => {
          let user = { id: doc.id, ...doc.data() };

          recousersData.push(user);
        });
        setRecoData(recousersData);
      });

    return () => recoUsersListener();
  }, []);

  const [cardIndex, setCardIndex] = React.useState(0);

  const onSwiped = () => {
    setCardIndex(cardIndex + 1);
    console.log('swiped');
  };

  const onSwipedLeft = index => {
    //need to delete uid from recommended_users
    try {
      dispatch(userActions.addDislikes(recoData[index].id));
      dispatch(userActions.removeRecommendedUser(recoData[index].id));
    } catch (err) {
      console.log(err.message);
    }

    console.log(recoData[index].name);
    console.log('swiped left');
  };

  const onSwipedRight = index => {
    //need to delete uid from recommended_users
    if (recoData.length != 0) {
      try {
        dispatch(userActions.addLikes(recoData[index].id));
        dispatch(
          userActions.addLikedBy(
            usersData.filter(user => user.id === recoData[index].id)[0],
            currUser
          )
        );
        dispatch(userActions.removeRecommendedUser(recoData[index].id));
      } catch (err) {
        console.log(err.message);
      }
    }
    console.log(recoData[index].name);
    console.log('swiped right');
  };

  const viewLayoutHandler = event => {
    if (viewHeight) {
      return;
    } else {
      setViewHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <SafeAreaView style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      <Layout style={styles.swiperContainer} onLayout={viewLayoutHandler}>
        {viewHeight != undefined && recoData.length != 0 && (
          <Swiper
            cards={recoData}
            renderCard={card => (
              <InfoCard key={card.id} cardData={card} navProps={navProps} />
            )}
            cardIndex={cardIndex}
            backgroundColor={'transparent'}
            useViewOverflow={Platform.OS === 'ios'}
            onSwiped={onSwiped}
            onSwipedLeft={onSwipedLeft}
            onSwipedRight={onSwipedRight}
            showSecondCard={true}
            stackSize={2}
            disableTopSwipe
            disableBottomSwipe
            stackScale={10}
            stackSeparation={14}
            cardVerticalMargin={(viewHeight - 540) / 2} // size of card is 540
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: '#FF7559',
                    borderColor: '#FF7559',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 15,
                    borderRadius: 20
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                    elevation: 5
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: '#8CB1FF',
                    borderColor: '#8CB1FF',
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 15,
                    borderRadius: 20
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                    elevation: 5
                  }
                }
              }
            }}
          ></Swiper>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: '#F5F5F5'
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 20
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  }
});

export default RecoUserScreen;
