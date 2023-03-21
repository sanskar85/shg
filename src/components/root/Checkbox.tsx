import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TICK} from '../../assets/Images';
import {COLORS} from '../../themes';
import Button from './Button';

type Props = {
  selected: boolean;
  onChange: (state: boolean) => void;
};

const Checkbox = ({selected, onChange}: Props) => {
  const onClick = () => {
    onChange(!selected);
  };

  return (
    <Button
      onClick={onClick}
      activeOpacity={0.8}
      style={[styles.container, selected ? styles.containerSelected : null]}>
      <View style={styles.tickContainer}>
        {selected && <TICK height={15} width={15} />}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickContainer: {
    width: 15,
    height: 15,
  },
  containerSelected: {
    backgroundColor: COLORS.ACTION,
    borderColor: COLORS.ACTION,
  },
});

export default Checkbox;
