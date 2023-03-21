import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SATOSHI_BOLD} from '../../../assets/font';
import {Row} from '../../../components/root';
import {hp, wp} from '../../../helpers/Helpers';
import {StoreNames} from '../../../store/config';
import {
  setAmount1_after15,
  setAmount1_before15,
  setAmount2_after15,
  setAmount2_before15,
  setAmount2_5_after15,
  setAmount2_5_before15,
  setPrinciplePrevious1_before15,
  setPrinciplePrevious1_after15,
  setPrinciplePrevious2_before15,
  setPrinciplePrevious2_after15,
  setPrinciplePrevious2_5_before15,
  setPrinciplePrevious2_5_after15,
} from '../../../store/reducers/LoanReducer';
import {COLORS} from '../../../themes';
import StoreState from '../../../types/store';

const LoanDataEntry = () => {
  const {
    amount1_after15,
    amount1_before15,
    amount2_after15,
    amount2_before15,
    amount2_5_after15,
    amount2_5_before15,
    principle_pending1,
    principle_pending2,
    principle_pending2_5,
    principle_previous1_after15,
    principle_previous1_before15,
    principle_previous2_after15,
    principle_previous2_before15,
    principle_previous2_5_after15,
    principle_previous2_5_before15,
  } = useSelector((state: StoreState) => state[StoreNames.LOAN]);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Row style={styles.taxHeader}>
        <View style={[styles.flex1, styles.center]} />
        <Text style={[styles.text, styles.flex1, styles.center]}>01 - 15</Text>
        <Text style={[styles.text, styles.flex1, styles.center]}>16 - 30</Text>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ऋण 1%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {principle_pending1}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount1_before15.toString()}
            onChangeText={text => dispatch(setAmount1_before15(Number(text)))}
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount1_after15.toString()}
            onChangeText={text => dispatch(setAmount1_after15(Number(text)))}
          />
        </View>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>पिछला ऋण 1%</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous1_before15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious1_before15(Number(text)))
            }
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous1_after15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious1_after15(Number(text)))
            }
          />
        </View>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ऋण 2%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {principle_pending2}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount2_before15.toString()}
            onChangeText={text => dispatch(setAmount2_before15(Number(text)))}
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount2_after15.toString()}
            onChangeText={text => dispatch(setAmount2_after15(Number(text)))}
          />
        </View>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>पिछला ऋण 2%</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous2_before15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious2_before15(Number(text)))
            }
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous2_after15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious2_after15(Number(text)))
            }
          />
        </View>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ऋण 2.5%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {principle_pending2_5}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount2_5_before15.toString()}
            onChangeText={text => dispatch(setAmount2_5_before15(Number(text)))}
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount2_5_after15.toString()}
            onChangeText={text => dispatch(setAmount2_5_after15(Number(text)))}
          />
        </View>
      </Row>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>पिछला ऋण 2.5%</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous2_5_before15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious2_5_before15(Number(text)))
            }
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={principle_previous2_5_after15.toString()}
            onChangeText={text =>
              dispatch(setPrinciplePrevious2_5_after15(Number(text)))
            }
          />
        </View>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(2),
    // gap: wp(2),
  },

  taxHeader: {
    paddingTop: wp(5),
    paddingBottom: wp(2),
  },

  taxContainer: {
    height: hp(8),
    gap: wp(2),
    borderTopColor: COLORS.GRAY,
    borderTopWidth: 1,
  },

  input: {
    height: hp(5),
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
    borderRadius: 10,
    color: COLORS.BLACK,
    paddingHorizontal: wp(2),
    fontSize: wp(3.5),
  },

  taxDetailContainer: {
    height: hp(8),
    flex: 1,
    paddingVertical: wp(2),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: wp(3.5),
  },
  textSmall: {
    fontSize: wp(3),
    color: COLORS.GRAY_DARK,
  },
  bold: {
    fontFamily: SATOSHI_BOLD,
  },
  flex1: {
    flex: 1,
  },
});

export default LoanDataEntry;
