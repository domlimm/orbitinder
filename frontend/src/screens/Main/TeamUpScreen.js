import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';
import Swiper from 'react-native-deck-swiper';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import _ from 'lodash';

import firebase from '../../firebase';
import { InfoCard, TitleHeader } from '../../components/index';
import { scoreUsers, processPrefs, sortScores } from '../../utils/ScoreUsers';

const TeamUpScreen = ({ navigation }) => {
  const { usersData } = useSelector(state => state.users);
  const currUser = useSelector(state => state.user.userData);
  const currPref = useSelector(state => state.user.userData.preferences);
  const [sortedUsers, setSortedUsers] = React.useState([]); //sorted according to algo
  const [prefsObj, setPrefsObj] = React.useState(); // contains preferences set by current user
  const dispatch = useDispatch();
  const [viewHeight, setViewHeight] = React.useState();
  const [displayRecoBtn, setRecoBtn] = React.useState(false);
  const [recoData, setRecoData] = React.useState([]);

  const navProps = {
    title: 'Team Up',
    navigation: navigation,
    needBackNav: false,
    needMenuNav: false
  };

  const [cardIndex, setCardIndex] = React.useState(0);

  const onSwiped = () => {
    setCardIndex(cardIndex + 1);
    console.log('swiped');
  };

  const onSwipedLeft = index => {
    try {
      dispatch(userActions.addDislikes(sortedUsers[index].id));
    } catch (err) {
      console.log(err.message);
    }

    console.log(sortedUsers[index].name);
    console.log('swiped left');
  };

  const onSwipedRight = index => {
    //like
    if (sortedUsers.length != 0) {
      try {
        dispatch(userActions.addLikes(sortedUsers[index].id));
        dispatch(
          userActions.addLikedBy(
            usersData.filter(user => user.id === sortedUsers[index].id)[0],
            currUser
          )
        );
      } catch (err) {
        console.log(err.message);
      }
    }

    console.log([...currUser.likes, sortedUsers[index].id]);
    console.log(currUser.likes);

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(idToken => {
        // let bearer = 'Bearer ' + idToken; // get auth token from firestore, getIdToken will refresh the token if it is expired
        fetch('http://10.0.2.2:5000/get_recommendations', {
          method: 'POST',
          withCredentials: true,
          mode: 'cors',
          headers: {
            Authorization: 'Bearer ' + idToken,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likes: [...currUser.likes, sortedUsers[index].id],
            dislikes: currUser.dislikes
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          })
          .then(data => {
            if (data.length != 0) {
              setRecoBtn(true); // displays reco btn
              setRecoData(data); // sets recommendation data, filters out current user
              console.log('data retrieved from server');
              console.log(data);
            } else {
              setRecoBtn(false);
              console.log('no data retreived from server');
            }
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const viewLayoutHandler = event => {
    if (viewHeight) {
      return;
    } else {
      setViewHeight(event.nativeEvent.layout.height);
    }
  };

  React.useEffect(() => {
    // starts the initial calculation of each user's score, calls the 3rd UE to execute
    if (currUser != undefined && prefsObj == undefined) {
      setPrefsObj(processPrefs(currUser));
    }
  }, [currUser]);

  React.useEffect(() => {
    //if user preferences change, recalculate the score of all users
    if (currUser != undefined) {
      setPrefsObj(processPrefs(currUser));
    }
  }, [currPref]);

  React.useEffect(() => {
    if (prefsObj != undefined && usersData != undefined) {
      usersData.forEach((element, index) => {
        // add score to each user obj
        element.score = scoreUsers(element, prefsObj);
      });
      usersData.sort(sortScores); // sort by score
      usersData.forEach(element => {
        console.log(element.name, element.score);
      });
      // console.log(prefsObj);
      setSortedUsers(
        // only show users user has not liked/disliked
        usersData.filter(
          u =>
            !currUser.likes.includes(u.id) && !currUser.dislikes.includes(u.id)
        )
      );
    }
  }, [usersData, prefsObj]);

  const handleRecoBtn = () => {
    setRecoBtn(false);
    navProps.navigation.navigate({
      name: 'RecoUser',
      params: {
        recoUsersData: recoData
      }
    });
  };

  React.useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribeFocus = navigation.addListener('focus', () => {
      //get realtime data from db
      console.log('focus');
      firebase
        .firestore()
        .collection('users')
        .doc(currUser.id)
        .get()
        .then(res => {
          if (res.exists) {
            const updatedUser = res.data();
            const allLikesDislikes = updatedUser.likes.concat(
              updatedUser.dislikes
            );
            const allrecodata = recoData.map(a => a.id);
            if (
              recoData.length != 0 &&
              allrecodata.every(i => allLikesDislikes.includes(i))
            ) {
              setRecoBtn(false);
            } else if (
              recoData.length != 0 &&
              !allrecodata.every(i => allLikesDislikes.includes(i))
            ) {
              setRecoBtn(true);
            }
            if (
              usersData != undefined &&
              usersData.length != 0 &&
              (!_.isEqual(updatedUser.likes, currUser.likes) ||
                !_.isEqual(updatedUser.dislikes, currUser.dislikes))
            ) {
              const meh = usersData.filter(
                u =>
                  !updatedUser.likes.includes(u.id) &&
                  !updatedUser.dislikes.includes(u.id)
              );
              setSortedUsers([meh[0], ...meh]);
            }
          }
        });
    });
    return () => {
      // Unsubscribe for the focus Listener
      unsubscribeFocus;
    };
  }, [navigation, usersData, currUser, recoData]);
  // }, [navigation, sortedUsers, usersData, currUser]);

  return (
    <SafeAreaView style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      <Layout style={styles.swiperContainer} onLayout={viewLayoutHandler}>
        {viewHeight != undefined &&
          sortedUsers.length != 0 &&
          sortedUsers != undefined && (
            <Swiper
              cards={sortedUsers}
              renderCard={card =>
                (card && (
                  <InfoCard key={card.id} cardData={card} navProps={navProps} />
                )) ||
                null
              }
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
      {displayRecoBtn ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
          onPress={handleRecoBtn}
        >
          <Image
            source={require('../../assets/images/shine.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
          disabled={true}
        >
          <Image
            source={require('../../assets/images/shine-grey.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      )}
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

export default TeamUpScreen;
