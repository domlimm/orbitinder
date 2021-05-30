import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, View } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
// To separate for local imports rather than installed dependencies: add below onwards
import { InfoCard, TitleHeader } from '../../components/index';
import Swiper from 'react-native-deck-swiper';
import { userArrayData } from '../../constants/userData';

const TeamUpScreen = ({ navigation }) => {
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

  return (
    <Layout style={styles.swiperContainer}>
      <TitleHeader navProps={navProps} />
      <Swiper
        cards={userArrayData}
        renderCard={card => {
          return <InfoCard cardData={card} navProps={navProps} />;
        }}
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
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: '#FF7559',
                borderColor: '#FF7559',
                color: 'white',
                borderWidth: 1,
                fontSize: 15
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 40,
                marginLeft: -30
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
                fontSize: 15
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 40,
                marginLeft: 30
              }
            }
          }
        }}
      ></Swiper>
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
