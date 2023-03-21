import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoanState from '../../store/types/LoanState';
import {MembersHelper, SettingsHelper} from '.';
import moment from 'moment';

const fetchLoanEntry = async (member_id: string): Promise<LoanState | null> => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }

  const docName = await SettingsHelper.getWorkingMonth();
  const loanEntry = await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .doc(member_id)
    .collection('Loans')
    .doc(docName)
    .get();

  const data = loanEntry.data() || {};

  return {
    principle_pending1: data?.principle_pending1 || 0,
    principle_pending2: data?.principle_pending2 || 0,
    principle_pending2_5: data?.principle_pending2_5 || 0,

    principle_previous1_before15: data?.principle_previous1_before15 || 0,
    principle_previous1_after15: data?.principle_previous1_after15 || 0,
    principle_previous2_before15: data?.principle_previous2_before15 || 0,
    principle_previous2_after15: data?.principle_previous2_after15 || 0,
    principle_previous2_5_before15: data?.principle_previous2_5_before15 || 0,
    principle_previous2_5_after15: data?.principle_previous2_5_after15 || 0,

    amount1_before15: data?.amount1_before15 || 0,
    amount1_after15: data?.amount1_after15 || 0,
    amount2_before15: data?.amount2_before15 || 0,
    amount2_after15: data?.amount2_after15 || 0,
    amount2_5_before15: data?.amount2_5_before15 || 0,
    amount2_5_after15: data?.amount2_5_after15 || 0,

    recovery1_after15: data?.recovery1_after15 || 0,
    recovery1_before15: data?.recovery1_before15 || 0,
    recovery2_after15: data?.recovery2_after15 || 0,
    recovery2_before15: data?.recovery2_before15 || 0,
    recovery2_5_after15: data?.recovery2_5_after15 || 0,
    recovery2_5_before15: data?.recovery2_5_before15 || 0,

    interest1: data?.interest1 || 0,
    interest2: data?.interest2 || 0,
    interest2_5: data?.interest2_5 || 0,

    interest_pending1: data?.interest_pending1 || 0,
    interest_pending2: data?.interest_pending2 || 0,
    interest_pending2_5: data?.interest_pending2_5 || 0,

    membership: data?.membership || 0,
    membership_pending: data?.membership_pending || 0,

    fine_charged: data?.fine_charged || 0,
    fine_pending: data?.fine_pending || 0,
    fine_paid: data?.fine_paid || 0,

    meeting_recovery: data?.meeting_recovery || 0,
    daily_recovery: data?.daily_recovery || 0,

    extra_fine_charged: data?.extra_fine_charged || 0,
    extra_fine_pending: data?.extra_fine_pending || 0,
    extra_fine_paid: data?.extra_fine_paid || 0,

    deduction2_5: data?.deduction2_5 || 0,
  };
};

const fetchSettledLoanEntry = async (
  member_id: string,
  working_month: moment.Moment,
): Promise<LoanState | null> => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }

  const docName = working_month.format('MM-YYYY');
  const loanEntry = await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .doc(member_id)
    .collection('Loans-Settled')
    .doc(docName)
    .get();

  const data = loanEntry.data() || {};

  return {
    principle_pending1: data?.principle_pending1 || 0,
    principle_pending2: data?.principle_pending2 || 0,
    principle_pending2_5: data?.principle_pending2_5 || 0,

    principle_previous1_before15: data?.principle_previous1_before15 || 0,
    principle_previous1_after15: data?.principle_previous1_after15 || 0,
    principle_previous2_before15: data?.principle_previous2_before15 || 0,
    principle_previous2_after15: data?.principle_previous2_after15 || 0,
    principle_previous2_5_before15: data?.principle_previous2_5_before15 || 0,
    principle_previous2_5_after15: data?.principle_previous2_5_after15 || 0,

    amount1_before15: data?.amount1_before15 || 0,
    amount1_after15: data?.amount1_after15 || 0,
    amount2_before15: data?.amount2_before15 || 0,
    amount2_after15: data?.amount2_after15 || 0,
    amount2_5_before15: data?.amount2_5_before15 || 0,
    amount2_5_after15: data?.amount2_5_after15 || 0,

    recovery1_after15: data?.recovery1_after15 || 0,
    recovery1_before15: data?.recovery1_before15 || 0,
    recovery2_after15: data?.recovery2_after15 || 0,
    recovery2_before15: data?.recovery2_before15 || 0,
    recovery2_5_after15: data?.recovery2_5_after15 || 0,
    recovery2_5_before15: data?.recovery2_5_before15 || 0,

    interest1: data?.interest1 || 0,
    interest2: data?.interest2 || 0,
    interest2_5: data?.interest2_5 || 0,

    interest_pending1: data?.interest_pending1 || 0,
    interest_pending2: data?.interest_pending2 || 0,
    interest_pending2_5: data?.interest_pending2_5 || 0,

    membership: data?.membership || 0,
    membership_pending: data?.membership_pending || 0,

    fine_charged: data?.fine_charged || 0,
    fine_pending: data?.fine_pending || 0,
    fine_paid: data?.fine_paid || 0,

    meeting_recovery: data?.meeting_recovery || 0,
    daily_recovery: data?.daily_recovery || 0,

    extra_fine_charged: data?.extra_fine_charged || 0,
    extra_fine_pending: data?.extra_fine_pending || 0,
    extra_fine_paid: data?.extra_fine_paid || 0,

    deduction2_5: data?.deduction2_5 || 0,
  };
};

const setLoanEntry = async (member_id: string, data: LoanState) => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }

  const docName = await SettingsHelper.getWorkingMonth();
  const doc = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .doc(member_id)
    .collection('Loans')
    .doc(docName);

  const docExists = await doc.get();
  if (!docExists.exists) {
    await doc.set(data);
  } else {
    await doc.update(data);
  }
};

const changeMonthCycle = async () => {
  const user = auth().currentUser;
  if (user === null) {
    return false;
  }
  const charges = await SettingsHelper.getProfileCharge();
  const members = await MembersHelper.fetchMembers();
  if (members === null || charges === null) {
    return false;
  }
  const colRef = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members');

  const promises = [];

  const workingMonth = await SettingsHelper.getWorkingMonth();

  for (const member of members) {
    const workingMonthMoment = moment(workingMonth, 'MM-YYYY');
    const data = await fetchLoanEntry(member.id);
    if (data === null) {
      continue;
    }

    const entry = {
      _principle_pending1: data.principle_pending1,
      _principle_pending2: data.principle_pending2,
      _principle_pending2_5: data.principle_pending2_5,

      _principle_previous1_before15: data.principle_previous1_before15,
      _principle_previous1_after15: data.principle_previous1_after15,
      _principle_previous2_before15: data.principle_previous2_before15,
      _principle_previous2_after15: data.principle_previous2_after15,
      _principle_previous2_5_before15: data.principle_previous2_5_before15,
      _principle_previous2_5_after15: data.principle_previous2_5_after15,

      _amount1_before15: data.amount1_before15,
      _amount1_after15: data.amount1_after15,
      _amount2_before15: data.amount2_before15,
      _amount2_after15: data.amount2_after15,
      _amount2_5_before15: data.amount2_5_before15,
      _amount2_5_after15: data.amount2_5_after15,

      _recovery1_after15: data.recovery1_after15,
      _recovery1_before15: data.recovery1_before15,
      _recovery2_after15: data.recovery2_after15,
      _recovery2_before15: data.recovery2_before15,
      _recovery2_5_after15: data.recovery2_5_after15,
      _recovery2_5_before15: data.recovery2_5_before15,

      _interest1: data.interest1,
      _interest2: data.interest2,
      _interest2_5: data.interest2_5,

      _interest_pending1: data.interest_pending1,
      _interest_pending2: data.interest_pending2,
      _interest_pending2_5: data.interest_pending2_5,

      _membership: data.membership,
      _membership_pending: data.membership_pending,

      _fine_charged: data.fine_charged,
      _fine_pending: data.fine_pending,
      _fine_paid: data.fine_paid,

      _meeting_recovery: data.meeting_recovery,
      _daily_recovery: data.daily_recovery,

      _extra_fine_charged: data.extra_fine_charged,
      _extra_fine_pending: data.extra_fine_pending,
      _extra_fine_paid: data.extra_fine_paid,

      _deduction2_5: data.deduction2_5,
    };

    const {dues1, dues2, dues2_5} = calculateDues(data as LoanState);

    const principle_pending1 =
      entry._principle_pending1 +
      entry._amount1_before15 +
      entry._amount1_after15 +
      entry._principle_previous1_before15 +
      entry._principle_previous1_after15 -
      entry._recovery1_after15 -
      entry._recovery1_before15;

    const principle_pending2 =
      entry._principle_pending2 +
      entry._amount2_before15 +
      entry._amount2_after15 +
      entry._principle_previous2_before15 +
      entry._principle_previous2_after15 -
      entry._recovery2_after15 -
      entry._recovery2_before15;

    const principle_pending2_5 =
      entry._principle_pending2_5 +
      entry._amount2_5_before15 +
      entry._amount2_5_after15 +
      entry._principle_previous2_5_before15 +
      entry._principle_previous2_5_after15 -
      entry._recovery2_5_after15 -
      entry._recovery2_5_before15;

    const interest_pending1 = dues1 - entry._interest1;
    const interest_pending2 = dues2 - entry._interest2;
    const interest_pending2_5 =
      dues2_5 - entry._interest2_5 - entry._deduction2_5;

    const membership_pending =
      charges.membership_charge + entry._membership_pending - entry._membership;

    const fine_pending =
      entry._fine_charged + entry._fine_pending - entry._fine_paid;

    const extra_fine_pending =
      entry._extra_fine_charged +
      entry._extra_fine_pending -
      entry._extra_fine_paid;

    const newEntry = {
      principle_pending1: Math.round(principle_pending1),
      principle_pending2: Math.round(principle_pending2),
      principle_pending2_5: Math.round(principle_pending2_5),
      interest_pending1: Math.round(interest_pending1),
      interest_pending2: Math.round(interest_pending2),
      interest_pending2_5: Math.round(interest_pending2_5),
      membership_pending: Math.round(membership_pending),
      fine_pending: Math.round(fine_pending),
      extra_fine_pending: Math.round(extra_fine_pending),
    };

    let promise = colRef
      .doc(member.id)
      .collection('Loans')
      .doc(moment(workingMonthMoment).add(1, 'month').format('MM-YYYY'))
      .set(newEntry);

    promises.push(promise);

    promise = colRef
      .doc(member.id)
      .collection('Loans-Settled')
      .doc(moment(workingMonthMoment).format('MM-YYYY'))
      .set(data as LoanState);

    promises.push(promise);

    promise = colRef
      .doc(member.id)
      .collection('Loans')
      .doc(moment(workingMonthMoment).format('MM-YYYY'))
      .delete();
  }

  await Promise.all(promises);
  return true;
};

const resetData = async () => {
  const user = auth().currentUser;
  if (user === null) {
    return false;
  }
  const charges = await SettingsHelper.getProfileCharge();
  const members = await MembersHelper.fetchMembers();
  if (members === null || charges === null) {
    return false;
  }
  const colRef = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members');

  const promises: Promise<any>[] = [];
  let promise = null;
  for (const member of members) {
    let loans = await colRef.doc(member.id).collection('Loans').get();
    let settledLoans = await colRef
      .doc(member.id)
      .collection('Loans-Settled')
      .get();

    for (const doc of loans.docs) {
      promise = colRef.doc(member.id).collection('Loans').doc(doc.id).delete();
      promises.push(promise);
    }
    for (const doc of settledLoans.docs) {
      promise = colRef
        .doc(member.id)
        .collection('Loans-Settled')
        .doc(doc.id)
        .delete();
      promises.push(promise);
    }
  }

  await Promise.all(promises);
  await SettingsHelper.setWorkingMonth(
    moment().subtract(2, 'years').format('MM-YYYY'),
  );
  return true;
};

const calculateDues = (entry: LoanState) => {
  let _dues1 = 0;
  let _dues2 = 0;
  let _dues2_5 = 0;
  _dues1 +=
    (entry.principle_pending1 +
      entry.principle_previous1_before15 +
      entry.principle_previous1_after15) *
    0.01; // 1% interest of principle pending
  _dues1 += entry.interest_pending1; // previous pending interest of 1%
  _dues1 += entry.amount1_before15 * 0.01; // 1% interest of current month
  _dues1 += entry.amount1_after15 * 0.005; // 2% interest of current month
  _dues1 += entry.principle_previous1_before15 * 0.01; // 1% interest of previous month before 15th
  _dues1 += entry.principle_previous1_after15 * 0.005; // 0.5% interest of previous month after 15th
  _dues1 -= entry.recovery1_before15 * 0.005; // 1% of total interest of current month subtracted

  _dues2 +=
    (entry.principle_pending2 +
      entry.principle_previous2_before15 +
      entry.principle_previous2_after15) *
    0.02; // 2% interest of principle pending of 2%
  _dues2 += entry.interest_pending2; // previous pending interest of 2%
  _dues2 += entry.interest_pending2 * 0.02; // 2% interest of previous pending interest of 2%
  _dues2 += entry.amount2_before15 * 0.02; // 2% interest of current month
  _dues2 += entry.amount2_after15 * 0.01; // 1% interest of current month
  _dues2 += entry.interest_pending1 * 0.02; // 2% interest of previous pending interest of 1%
  _dues2 += entry.principle_previous2_before15 * 0.02; // 2% interest of previous month before 15th
  _dues2 += entry.principle_previous2_after15 * 0.01; // 1% interest of previous month after 15th
  _dues2 += entry.membership_pending * 0.02; // 2% interest of previous pending membership charge
  _dues2 -= entry.recovery2_before15 * 0.01; // 1% of total interest of current month subtracted

  _dues2_5 +=
    (entry.principle_pending2_5 +
      entry.principle_previous2_5_before15 +
      entry.principle_previous2_5_after15) *
    0.025; // 2.5% interest of principle pending
  _dues2_5 += entry.interest_pending2_5; // previous pending interest of 2.5%
  _dues2_5 += entry.interest_pending2_5 * 0.05; // 5% interest of previous pending interest
  _dues2_5 += entry.amount2_5_before15 * 0.025; // 2.5% interest of current month
  _dues2_5 += entry.amount2_5_after15 * 0.0125; // 1.25% interest of current month
  _dues2_5 += entry.principle_previous2_5_before15 * 0.025; // 2% interest of previous month before 15th
  _dues2_5 += entry.principle_previous2_5_after15 * 0.0125; // 1% interest of previous month after 15th
  _dues2_5 -= entry.recovery2_5_before15 * 0.0125; // 1% of total interest of current month subtracted

  return {
    dues1: _dues1,
    dues2: _dues2,
    dues2_5: _dues2_5,
  };
};

const Settings = {
  fetchLoanEntry,
  fetchSettledLoanEntry,
  setLoanEntry,
  changeMonthCycle,
  resetData,
  calculateDues,
};

export default Settings;
