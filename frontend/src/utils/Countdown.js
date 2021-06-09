import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { TextStyleProps } from '@ui-kitten/components/devsupport';

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
    let countDownDate = new Date('June 28, 2021  13:09:00 GMT+08:00').getTime();
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
    <Layout style={styles.mainContainer}>
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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  container: {
    // alignItems: 'center'
  },
  cntDownText: {
    color: 'white',
    textAlign: 'center'
  },
  labelText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
  box: {
    backgroundColor: 'black',
    padding: 10
  }
});

export default CountDown;
