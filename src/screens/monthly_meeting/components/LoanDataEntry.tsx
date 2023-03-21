import React, {useMemo} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SATOSHI_BOLD} from '../../../assets/font';
import {Checkbox, Row} from '../../../components/root';
import {hp, wp} from '../../../helpers/Helpers';
import {StoreNames} from '../../../store/config';
import {
  setMembership,
  setInterest1,
  setInterest2,
  setInterest2_5,
  setFinePaid,
  setDailyRecovery,
  setExtraFinePaid,
  setFineCharged,
  setDeduction2_5,
  setMeetingRecovery,
  setExtraFineCharged,
} from '../../../store/reducers/LoanReducer';
import {COLORS} from '../../../themes';
import StoreState from '../../../types/store';

const LoanDataEntry = () => {
  const loan_details = useSelector(
    (state: StoreState) => state[StoreNames.LOAN],
  );
  const {membership_charge, meeting_fine} = useSelector(
    (state: StoreState) => state[StoreNames.PROFILE],
  );
  const dispatch = useDispatch();

  const attendanceChanged = (isPresentInMeeting: boolean) => {
    dispatch(setFineCharged(isPresentInMeeting ? 0 : meeting_fine));
  };

  const {
    dues1,
    dues2,
    dues2_5,
    dues_membership,
    interest1,
    interest2,
    interest2_5,
    membership,
    fine_charged,
    fine_paid,
    fine_pending,
    meeting_recovery,
    daily_recovery,
    extra_fine_paid,
    extra_fine_charged,
    extra_fine_pending,
    deduction2_5,
  } = useMemo(() => {
    const {
      amount1_after15,
      amount1_before15,
      amount2_after15,
      amount2_before15,
      amount2_5_after15,
      amount2_5_before15,

      recovery1_before15,
      recovery2_before15,
      recovery2_5_before15,

      principle_pending1,
      principle_pending2,
      principle_pending2_5,

      principle_previous1_after15,
      principle_previous1_before15,
      principle_previous2_after15,
      principle_previous2_before15,
      principle_previous2_5_after15,
      principle_previous2_5_before15,

      interest1: _interest1,
      interest2: _interest2,
      interest2_5: _interest2_5,

      interest_pending1,
      interest_pending2,
      interest_pending2_5,

      membership_pending,
      membership: _membership,

      fine_charged: _fine_charged,
      fine_paid: _fine_paid,
      fine_pending: _fine_pending,

      meeting_recovery: _meeting_recovery,
      daily_recovery: _daily_recovery,

      extra_fine_charged: _extra_fine_charged,
      extra_fine_pending: _extra_fine_pending,
      extra_fine_paid: _extra_fine_paid,

      deduction2_5: _deduction2_5,
    } = loan_details;

    let _dues1 = 0;
    let _dues2 = 0;
    let _dues2_5 = 0;

    _dues1 +=
      (principle_pending1 +
        principle_previous1_before15 +
        principle_previous1_after15) *
      0.01; // 1% interest of principle pending
    _dues1 += interest_pending1; // previous pending interest of 1%
    _dues1 += amount1_before15 * 0.01; // 1% interest of current month
    _dues1 += amount1_after15 * 0.005; // 2% interest of current month
    _dues1 += principle_previous1_before15 * 0.01; // 1% interest of previous month before 15th
    _dues1 += principle_previous1_after15 * 0.005; // 0.5% interest of previous month after 15th
    _dues1 -= recovery1_before15 * 0.005; // 1% of total interest of current month subtracted

    _dues2 +=
      (principle_pending2 +
        principle_previous2_before15 +
        principle_previous2_after15) *
      0.02; // 2% interest of principle pending of 2%
    _dues2 += interest_pending2; // previous pending interest of 2%
    _dues2 += interest_pending2 * 0.02; // 2% interest of previous pending interest of 2%
    _dues2 += amount2_before15 * 0.02; // 2% interest of current month
    _dues2 += amount2_after15 * 0.01; // 1% interest of current month
    _dues2 += interest_pending1 * 0.02; // 2% interest of previous pending interest of 1%
    _dues2 += principle_previous2_before15 * 0.02; // 2% interest of previous month before 15th
    _dues2 += principle_previous2_after15 * 0.01; // 1% interest of previous month after 15th
    _dues2 += membership_pending * 0.02; // 2% interest of previous pending membership charge
    _dues2 -= recovery2_before15 * 0.01; // 1% of total interest of current month subtracted

    _dues2_5 +=
      (principle_pending2_5 +
        principle_previous2_5_before15 +
        principle_previous2_5_after15) *
      0.025; // 2.5% interest of principle pending
    _dues2_5 += interest_pending2_5; // previous pending interest of 2.5%
    _dues2_5 += interest_pending2_5 * 0.05; // 5% interest of previous pending interest
    _dues2_5 += amount2_5_before15 * 0.025; // 2.5% interest of current month
    _dues2_5 += amount2_5_after15 * 0.0125; // 1.25% interest of current month
    _dues2_5 += principle_previous2_5_before15 * 0.025; // 2% interest of previous month before 15th
    _dues2_5 += principle_previous2_5_after15 * 0.0125; // 1% interest of previous month after 15th
    _dues2_5 -= recovery2_5_before15 * 0.0125; // 1% of total interest of current month subtracted

    return {
      dues1: Math.round(_dues1),
      dues2: Math.round(_dues2),
      dues2_5: Math.round(_dues2_5),
      dues_membership: Math.round(membership_charge + membership_pending),
      interest1: Math.round(_interest1),
      interest2: Math.round(_interest2),
      interest2_5: Math.round(_interest2_5),
      membership: Math.round(_membership),
      fine_charged: Math.round(_fine_charged),
      fine_paid: Math.round(_fine_paid),
      fine_pending: Math.round(_fine_pending),
      daily_recovery: Math.round(_daily_recovery),
      extra_fine_pending: Math.round(_extra_fine_pending),
      extra_fine_paid: Math.round(_extra_fine_paid),
      extra_fine_charged: Math.round(_extra_fine_charged),
      deduction2_5: Math.round(_deduction2_5),
      meeting_recovery: Math.round(_meeting_recovery),
    };
  }, [loan_details, membership_charge]);

  return (
    <View style={styles.container}>
      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>दैनिक जमा</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={daily_recovery.toString()}
            onChangeText={text => dispatch(setDailyRecovery(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>मीटिंग जमा</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={meeting_recovery.toString()}
            onChangeText={text => dispatch(setMeetingRecovery(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>सदस्यता</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {dues_membership}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={membership.toString()}
            onChangeText={text => dispatch(setMembership(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ब्याज 1%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {dues1}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={interest1.toString()}
            onChangeText={text => dispatch(setInterest1(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ब्याज 2%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {dues2}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={interest2.toString()}
            onChangeText={text => dispatch(setInterest2(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ब्याज 2.5%</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {dues2_5}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={interest2_5.toString()}
            onChangeText={text => dispatch(setInterest2_5(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>ब्याज 2.5%</Text>
          <Text style={[styles.text, styles.textSmall]}>Deduction</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={deduction2_5.toString()}
            onChangeText={text => dispatch(setDeduction2_5(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>अन्य जुर्माना</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {extra_fine_pending}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex1]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={extra_fine_charged.toString()}
            onChangeText={text => dispatch(setExtraFineCharged(Number(text)))}
          />
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex1]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={extra_fine_paid.toString()}
            onChangeText={text => dispatch(setExtraFinePaid(Number(text)))}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>उपस्थिति</Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.start, styles.flex2]}>
          <Checkbox
            selected={fine_charged !== meeting_fine}
            onChange={attendanceChanged}
          />
        </View>
      </Row>

      <Row style={styles.taxContainer}>
        <View style={styles.taxDetailContainer}>
          <Text style={[styles.text, styles.bold]}>उपस्थिति जुर्माना</Text>
          <Text style={[styles.text, styles.textSmall]}>
            बकाया राशि:- {fine_pending}
          </Text>
        </View>
        <View style={[styles.taxDetailContainer, styles.center, styles.flex2]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={fine_paid.toString()}
            onChangeText={text => dispatch(setFinePaid(Number(text)))}
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

  start: {
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  flex2: {
    flex: 2,
  },
});

export default LoanDataEntry;
