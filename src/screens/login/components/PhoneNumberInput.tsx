import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SATOSHI_MEDIUM} from '../../../assets/font';
import {Row} from '../../../components/root';
import {wp} from '../../../helpers/Helpers';
import {COLORS} from '../../../themes';

// const VALID_NUMBER_REGEX = /^[6-9]\d{9}$/gi;

type Props = {
  value?: string;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
};

const DEFAULT: Props = {
  value: '',
  onTextChange: () => {},
  disabled: false,
};

const PhoneNumberInput = (props = DEFAULT) => {
  return (
    <View style={styles.wrapper}>
      <Row>
        <View style={styles.countryCodeWrapper}>
          <Text style={styles.countryCode}>+91</Text>
        </View>
        <View style={styles.phoneInputWrapper}>
          <TextInput
            value={props.value}
            maxLength={10}
            returnKeyType={'go'}
            style={styles.phoneInput}
            keyboardType={'phone-pad'}
            onChangeText={props.onTextChange}
            editable={!props.disabled}
          />
        </View>
      </Row>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: wp(12),
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
    borderRadius: 30,
    overflow: 'hidden',
  },
  countryCodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(20),
    height: '100%',
    borderRadius: 30,
    backgroundColor: COLORS.ACTION,
  },
  countryCode: {
    color: COLORS.PRIMARY,
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
    letterSpacing: 2,
  },
  phoneInputWrapper: {
    flex: 1,
    paddingLeft: wp(3),
  },
  phoneInput: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    color: COLORS.BLACK,
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
    letterSpacing: 10,
  },
});

export default PhoneNumberInput;
