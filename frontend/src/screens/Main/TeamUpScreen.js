import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';
import Swiper from 'react-native-deck-swiper';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import _ from 'lodash';

import firebase from '../../firebase';
import { InfoCard, TitleHeader, Toast } from '../../components/index';
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

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertStatus, setAlertStatus] = React.useState('info');

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

  React.useEffect(() => {
    const recoUsersListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const recoIDs = querySnapshot.data().recommended_users;
        if (recoIDs != undefined) {
          if (recoIDs.length != 0) {
            setRecoBtn(true);
            console.log('check reco');
            setRecoData(recoIDs);
          } else {
            setRecoBtn(false);
          }
          console.log(recoIDs);
        }
      });

    return () => recoUsersListener();
  }, []);

  const onSwipedLeft = index => {
    if (!currUser.matched) {
      try {
        dispatch(userActions.addDislikes(sortedUsers[index].id));
      } catch (err) {
        console.log(err.message);
      }

      console.log(sortedUsers[index].name);
      console.log('swiped left');
    } else {
      setShowAlert(true);
      setAlertMessage(
        'You have already found a teammate!\nHowever, you can still swipe & explore! 🔎'
      );
    }
  };

  const onSwipedRight = index => {
    if (sortedUsers.length != 0 && !currUser.matched) {
      try {
        dispatch(userActions.addLikes(sortedUsers[index].id));
        dispatch(
          userActions.addLikedBy(
            usersData.filter(user => user.id === sortedUsers[index].id)[0],
            currUser
          )
        );

        console.log([...currUser.likes, sortedUsers[index].id]);
        console.log(currUser.likes);

        firebase
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            // console.log(idToken);
            // let bearer = 'Bearer ' + idToken; // get auth token from firestore, getIdToken will refresh the token if it is expired
            fetch(
              'https://orbitinder-recommend.herokuapp.com/get_recommendations',
              {
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
              }
            );
          })
          .catch(e => {
            console.log(e);
          });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setShowAlert(true);
      setAlertMessage(
        'You have already found a teammate!\nHowever, you can still swipe & explore! 🔎'
      );
    }
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
      console.log('at eff1');
      setPrefsObj(processPrefs(currUser));
    }
  }, [currUser]);

  React.useEffect(() => {
    //if user preferences change, recalculate the score of all users
    if (currUser != undefined) {
      console.log('at eff2');
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
      console.log('at eff3');
      let fil = usersData.filter(
        u =>
          !currUser.likes.includes(u.id) &&
          !currUser.dislikes.includes(u.id) &&
          !u.matched &&
          !recoData.includes(u.id)
      );
      console.log(fil[0].name);
      setSortedUsers(
        // only show users user has not liked/disliked
        fil
      );
      console.log(cardIndex);
    }
  }, [usersData, prefsObj]);

  React.useEffect(() => {
    if (sortedUsers != undefined) {
      if (sortedUsers.length != 0) {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            let arr_reco = snapshot.data().recommended_users;
            let arr_dislikes = snapshot.data().dislikes;
            let arr_likes = snapshot.data().likes;
            console.log(sortedUsers.length);
            if (arr_reco != undefined) {
              console.log(arr_reco);
              let fil = sortedUsers.filter(u => !arr_reco.includes(u.id));
              console.log('fil: ', fil.length);
              setSortedUsers(fil);
            }
          });
      }
    }
  }, [recoData]);

  const handleRecoBtn = () => {
    // setRecoBtn(false);
    navProps.navigation.navigate({
      name: 'RecoUser',
      params: {
        recoUsersData: recoData
      }
    });
  };

  return (
    <SafeAreaView style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      {showAlert && (
        <Toast
          message={alertMessage}
          status={alertStatus}
          hide={show => setShowAlert(show)}
          stay={true}
        />
      )}
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
    backgroundColor: '#FAFAFA'
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA'
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
