import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface RowProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Row = ({children, style}: RowProps) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Row;
