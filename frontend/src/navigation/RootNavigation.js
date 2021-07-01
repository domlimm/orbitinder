import React from 'react';

export const navigationRef = React.createRef();

const navigate = (name, params) => {
  console.log('entered navigating'); // does not print
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate
};
