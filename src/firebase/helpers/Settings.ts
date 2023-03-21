import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const fetchAllGroups = async (): Promise<string[]> => {
  const user = auth().currentUser;
  if (user === null) {
    return [];
  }
  const userSettings = await firestore()
    .collection('Users')
    .doc(user.uid)
    .get();
  if (!userSettings.exists) {
    return [];
  }

  const data = userSettings.data();
  if (data === undefined || data.groups === undefined) {
    return [];
  }
  return data.groups;
};

const saveGroups = async (groups: string[]) => {
  const user = auth().currentUser;
  if (user === null) {
    return;
  }

  const userSettings = firestore().collection('Users').doc(user.uid);
  const doc = await userSettings.get();

  if (doc.exists) {
    await userSettings.update({groups});
  } else {
    await userSettings.set({groups});
  }
};

const getProfileCharge = async () => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }
  const userSettings = await firestore()
    .collection('Users')
    .doc(user.uid)
    .get();
  if (!userSettings.exists) {
    return null;
  }

  const data = userSettings.data();
  if (data === undefined || data.membership_charge === undefined) {
    return null;
  }
  return {
    membership_charge: data.membership_charge as number,
    meeting_fine: data.meeting_fine as number,
    deposit: data.deposit as number,
  };
};

const setProfileCharge = async ({
  membership_charge,
  meeting_fine,
}: {
  membership_charge: number;
  meeting_fine: number;
}) => {
  const user = auth().currentUser;
  if (user === null) {
    return;
  }
  const userSettings = firestore().collection('Users').doc(user.uid);
  const doc = await userSettings.get();
  if (doc.exists) {
    await userSettings.update({membership_charge, meeting_fine});
  } else {
    await userSettings.set({membership_charge, meeting_fine});
  }
};

const getWorkingMonth = async () => {
  const user = auth().currentUser;
  if (user === null) {
    return moment().subtract(2, 'years').format('MM-YYYY');
  }
  const userSettings = await firestore()
    .collection('Users')
    .doc(user.uid)
    .get();
  if (!userSettings.exists) {
    return moment().subtract(2, 'years').format('MM-YYYY');
  }

  const data = userSettings.data();
  if (data === undefined || data.working_month === undefined) {
    return moment().subtract(2, 'years').format('MM-YYYY');
  }
  return data.working_month as string;
};

const setWorkingMonth = async (working_month: string) => {
  const user = auth().currentUser;
  if (user === null) {
    return;
  }
  const userSettings = firestore().collection('Users').doc(user.uid);
  const doc = await userSettings.get();
  if (doc.exists) {
    await userSettings.update({working_month});
  } else {
    await userSettings.set({working_month});
  }
};

const Settings = {
  fetchAllGroups,
  saveGroups,
  getProfileCharge,
  setProfileCharge,
  getWorkingMonth,
  setWorkingMonth,
};

export default Settings;
