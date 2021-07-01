import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function CountDown() {
  const [time, setTime] = React.useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  });
  React.useEffect(() => {
    let countDownDate = new Date('July 31, 2021  00:00:00 GMT+08:00').getTime();
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
        Time Remaining for Orbital Application
      </Text>
      <Layout style={styles.contentContainer}>
        <Layout style={styles.container}>
          <Layout style={styles.box}>
            <Text style={styles.cntDownText}>{time.days}</Text>
          </Layout>
          <Text style={styles.labelText}>DAYS</Text>
        </Layout>

        <Layout style={styles.container}>
          <Layout style={styles.box}>
            <Text style={styles.cntDownText}>{time.hours}</Text>
          </Layout>
          <Text style={styles.labelText}>HRS</Text>
        </Layout>

        <Layout style={styles.container}>
          <Layout style={styles.box}>
            <Text style={styles.cntDownText}>{time.minutes}</Text>
          </Layout>
          <Text style={styles.labelText}>MINS</Text>
        </Layout>

        <Layout style={styles.container}>
          <Layout style={styles.box}>
            <Text style={styles.cntDownText}>{time.seconds}</Text>
          </Layout>
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
    backgroundColor: 'white',
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
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  cntDownText: {
    color: 'white',
    textAlign: 'center'
  },
  labelText: {
    color: '#203E80',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
  box: {
    backgroundColor: '#203E80',
    padding: 10,
    borderRadius: 4
  }
});

export default CountDown;
