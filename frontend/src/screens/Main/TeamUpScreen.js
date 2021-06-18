import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Swiper from 'react-native-deck-swiper';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../redux/actions/user';

// To separate for local imports rather than installed dependencies: add below onwards
import { InfoCard, TitleHeader } from '../../components/index';
import { scoreUsers, processPrefs, sortScores } from '../../utils/ScoreUsers';

const TeamUpScreen = ({ navigation }) => {
  const { usersData } = useSelector(state => state.users);
  const currUser = useSelector(state => state.user.userData);
  const [sortedUsers, setSortedUsers] = React.useState([]);
  const [prefsObj, setPrefsObj] = React.useState();
  const dispatch = useDispatch();
  const [viewHeight, setViewHeight] = React.useState();

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
    //dislike
    const dislikes = {
      dislikes: [...currUser.dislikes, sortedUsers[index].id]
    };

    try {
      dispatch(userActions.addDislikes(dislikes));
    } catch (err) {
      console.log(err.message);
    }

    console.log(sortedUsers[index].name);
    console.log('swiped left');
  };

  const onSwipedRight = index => {
    //like
    if (sortedUsers.length != 0) {
      const likes = {
        likes: [...currUser.likes, sortedUsers[index].id]
      };

      try {
        dispatch(userActions.addLikes(likes));
      } catch (err) {
        console.log(err.message);
      }
    }
    console.log(sortedUsers[index].name);
    console.log('swiped right');
  };

  const viewLayoutHandler = event => {
    if (viewHeight) {
      return;
    } else {
      setViewHeight(event.nativeEvent.layout.height);
    }
  };

  React.useEffect(() => {
    if (currUser != undefined && prefsObj == undefined) {
      setPrefsObj(processPrefs(currUser));
    }
  }, [currUser]);

  React.useEffect(() => {
    if (prefsObj != undefined && usersData != undefined) {
      usersData.forEach((element, index) => {
        // add score to each user obj
        element.score = scoreUsers(element, prefsObj);
      });
      usersData.sort(sortScores); // sort by score
      // usersData.forEach(element => {
      //   console.log(element.name, element.score);
      // });
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

  return (
    <Layout style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      <Layout style={styles.swiperContainer} onLayout={viewLayoutHandler}>
        {viewHeight != undefined && sortedUsers.length != 0 && (
          <Swiper
            cards={sortedUsers}
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
      <TouchableOpacity
        // disabled={true}
        activeOpacity={0.7}
        style={styles.touchableOpacityStyle}
        // onPress={navigate}
      >
        <Image
          source={require('../../assets/images/shine.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </Layout>
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
