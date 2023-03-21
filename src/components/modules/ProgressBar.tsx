import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../themes';

export default function ({progress = 0}) {
  return (
    <View style={styles.progressWrapper}>
      <View style={[styles.progressBar, {width: `${progress}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrapper: {
    width: '100%',
    backgroundColor: COLORS.NAVIGATION_BAR,
    borderRadius: 20,
    height: 10,
  },
  progressBar: {
    width: '0%',
    height: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },
});
