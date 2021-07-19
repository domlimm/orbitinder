import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

function pad(n) {
  return n < 10 ? '0' + n : n;
}
const countdownBgColor = '#ffffff';

// A6C2FF purplish blue
//8CB1FF
//407BFF

//E8F2FB
function CountDown() {
  const [time, setTime] = React.useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  });
  React.useEffect(() => {
    let countDownDate = new Date('July 26, 2021  00:00:00 GMT+08:00').getTime();
    //update every second
    let x = setInterval(function () {
      //Get todays date and time
      let now = new Date().getTime();

      // find the difference between now and count down date
      let difference = countDownDate - now;
      let days = pad(Math.floor(difference / (1000 * 60 * 60 * 24)));
      let hours = pad(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      let minutes = pad(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      );
      let seconds = pad(Math.floor((difference % (1000 * 60)) / 1000));
      setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
      if (difference < 0) {
        clearInterval(x);
        setTime({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);
  }, []);
  return (
    <Layout style={styles.countdownCard}>
      <Text category='h5' style={styles.countDownTitle}>
        Orbital Application Deadline
      </Text>
      <Layout style={styles.contentContainer}>
        <Layout style={styles.container}>
          {/* <Layout style={styles.box}> */}
          <Text style={styles.cntDownText}>{time.days}</Text>
          {/* </Layout> */}
          <Text style={styles.labelText}>DAYS</Text>
        </Layout>
        <Layout style={styles.container}>
          <Text style={styles.cntDownText}>:</Text>
        </Layout>

        <Layout style={styles.container}>
          {/* <Layout style={styles.box}> */}
          <Text style={styles.cntDownText}>{time.hours}</Text>
          {/* </Layout> */}
          <Text style={styles.labelText}>HRS</Text>
        </Layout>
        <Layout style={styles.container}>
          <Text style={styles.cntDownText}>:</Text>
        </Layout>
        <Layout style={styles.container}>
          {/* <Layout style={styles.box}> */}
          <Text style={styles.cntDownText}>{time.minutes}</Text>
          {/* </Layout> */}
          <Text style={styles.labelText}>MINS</Text>
        </Layout>
        <Layout style={styles.container}>
          <Text style={styles.cntDownText}>:</Text>
        </Layout>
        <Layout style={styles.container}>
          {/* <Layout style={styles.box}> */}
          <Text style={styles.cntDownText}>{time.seconds}</Text>
          {/* </Layout> */}
          <Text style={styles.labelText}>SECS</Text>
        </Layout>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  countdownCard: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: countdownBgColor,
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
  },
  countDownTitle: {
    textAlign: 'center',
    fontSize: 18,
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'black'
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent'
    // marginTop:
  },
  cntDownText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40
  },
  labelText: {
    color: 'black',
    // fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  box: {
    backgroundColor: '#A6C2FF',
    paddingVertical: 7
    // backgroundColor: '#000000', //#203E80
    // padding: 5
    // borderRadius: 4
  },
  container: {
    backgroundColor: 'transparent',
    marginVertical: 5
  }
});

export default CountDown;
