import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Swiper from 'react-native-deck-swiper';
import { useSelector } from 'react-redux';
// To separate for local imports rather than installed dependencies: add below onwards
import { InfoCard, TitleHeader } from '../../components/index';
import { scoreUsers, processPrefs, sortScores } from '../../utils/ScoreUsers';

const TeamUpScreen = ({ navigation }) => {
  const { userData } = useSelector(state => state.users);
  const currUser = useSelector(state => state.user.userData);
  const [sortedUsers, setSortedUsers] = React.useState();
  const [prefsObj, setPrefsObj] = React.useState();

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
    console.log('swiped left');
  };

  const onSwipedRight = index => {
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
    if (currUser != undefined) {
      setPrefsObj(processPrefs(currUser));
    }
  }, [currUser]);

  React.useEffect(() => {
    if (prefsObj != undefined && userData != undefined) {
      userData.forEach((element, index) => {
        element.score = scoreUsers(element, prefsObj);
      });
      // userData.sort(sortTry);
      userData.sort(sortScores);
      userData.forEach(element => {
        console.log(element.score);
      });
      console.log(prefsObj);
    }
  }, [userData, prefsObj]);

  return (
    <Layout style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      <Layout style={styles.swiperContainer} onLayout={viewLayoutHandler}>
        {viewHeight ? (
          <Swiper
            cards={userData}
            renderCard={card => (
              <InfoCard cardData={card} navProps={navProps} />
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
        ) : null}
      </Layout>
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
  }
});

export default TeamUpScreen;
