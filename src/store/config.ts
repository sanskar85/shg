import auth from '@react-native-firebase/auth';
import {MembersHelper, SettingsHelper} from '../firebase/helpers';
import {StoreType} from '../types/store';
import {setGroups} from './reducers/GroupReducer';
import {setMembers} from './reducers/MemberReducer';
import {setDetails as setProfileDetails} from './reducers/ProfileReducer';

export enum StoreNames {
  //   UTILS = 'utils',
  PROFILE = 'profile',
  GROUP = 'group',
  MEMBER = 'member',
  LOAN = 'loan',
}

const LoadUserDetails = async (store: StoreType) => {
  const user = auth().currentUser;

  if (user === null) {
    return;
  }
  const {membership_charge, meeting_fine} =
    (await SettingsHelper.getProfileCharge()) || {
      membership_charge: 0,
      meeting_fine: 0,
    };

  const working_month = await SettingsHelper.getWorkingMonth();

  store.dispatch(
    setProfileDetails({
      membership_charge: membership_charge || 0,
      meeting_fine: meeting_fine || 0,
      name: user.displayName || '',
      phone: user.phoneNumber || '',
      working_month: working_month,
    }),
  );
};

const LoadGroupDetails = async (store: StoreType) => {
  const groups = await SettingsHelper.fetchAllGroups();
  store.dispatch(setGroups(groups));
};

const LoadMemberDetails = async (store: StoreType) => {
  const members = await MembersHelper.fetchMembers();
  store.dispatch(setMembers(members));
};

export {LoadUserDetails, LoadGroupDetails, LoadMemberDetails};
