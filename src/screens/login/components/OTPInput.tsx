import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SATOSHI_MEDIUM} from '../../../assets/font';
import {Row} from '../../../components/root';
import {wp} from '../../../helpers/Helpers';
import {COLORS} from '../../../themes';

// const VALID_NUMBER_REGEX = /^[6-9]\d{9}$/gi;

const OTP_LENGTH = 6;

type OTP = [string, string, string, string, string, string];

type Props = {
  value: string[];
  onTextChange: (text: OTP) => void;
  disabled?: boolean;
};

const DEFAULT: Props = {
  value: ['', '', '', '', '', ''],
  onTextChange: () => {},
  disabled: false,
};

const OTPInput = (props = DEFAULT) => {
  const refs = React.useRef<(TextInput | null)[]>([]);

  return (
    <View style={styles.wrapper}>
      <Row style={styles.otpInputWrapper}>
        {[1, 2, 3, 4, 5, 6].map((_, index) => {
          return (
            <Digit
              ref={element => (refs.current[index] = element)}
              key={index}
              disabled={props.disabled}
              value={props.value[index]}
              onTextChange={(text: string) => {
                if (isNaN(Number(text))) {
                  return;
                }
                const newOTP = [...props.value];
                newOTP[index] = text;
                props.onTextChange(newOTP as OTP);
                if (text.length === 1 && index < OTP_LENGTH - 1) {
                  refs.current[index + 1]?.focus();
                } else if (text.length === 0 && index > 0) {
                  refs.current[index - 1]?.focus();
                }
              }}
            />
          );
        })}
      </Row>
    </View>
  );
};

type DigitProps = {
  value: string;
  onTextChange: (text: string) => void;
  disabled?: boolean;
};

const Digit = React.forwardRef(
  (props: DigitProps, ref: React.LegacyRef<TextInput>) => {
    return (
      <TextInput
        ref={ref}
        value={props.value}
        maxLength={1}
        returnKeyType={'next'}
        style={styles.digit}
        keyboardType={'number-pad'}
        onChangeText={props.onTextChange}
        editable={!props.disabled}
      />
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 70,
    overflow: 'hidden',
  },
  otpInputWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  digit: {
    width: wp(12),
    height: wp(12),
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: wp(4),
    fontFamily: SATOSHI_MEDIUM,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
  },
});

export default OTPInput;
