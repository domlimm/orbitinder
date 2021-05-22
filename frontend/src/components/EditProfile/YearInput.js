import React from 'react';
import { StyleSheet } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { yearData } from '../../constants/profleCreationData';
const YearInput = ({ userData, sendDataToParent }) => {
  const [selectedYearIndex, setSelectedYearIndex] = React.useState(
    new IndexPath(yearData.indexOf(userData))
  );
  // const displayYear = yearData[selectedYearIndex.row];

  const [displayYear, setDisplayYear] = React.useState(
    yearData[selectedYearIndex.row]
  );
  changeSelectHandler = input => {
    setSelectedYearIndex(input);
    sendDataToParent(displayYear);
  };

  React.useEffect(() => {
    setDisplayYear(yearData[selectedYearIndex.row]);
  }, [changeSelectHandler]);

  // console.log(displayYear);

  return (
    <Select
      style={styles.selectInput}
      selectedIndex={selectedYearIndex}
      value={displayYear}
      onSelect={index => changeSelectHandler(index)}
      label='Year of Study'
    >
      {yearData.map((value, key) => (
        <SelectItem key={key} title={value} />
      ))}
    </Select>
  );
};

const styles = StyleSheet.create({
  selectInput: {
    width: '80%',
    marginVertical: 10
  }
});

export default YearInput;
