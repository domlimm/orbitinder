import dayjs from 'dayjs';

const greeting = () => {
  const hour = parseInt(dayjs().format('HH'));
  const greeting =
    hour >= 0 && hour < 12
      ? 'good morning,'
      : hour >= 12 && hour < 17
      ? 'good afternoon,'
      : 'good evening,';

  return greeting.toUpperCase();
};

export default greeting;
