import {AuthStatus} from '../reducers/ProfileReducer';

type ProfileState = {
  name: string;
  phone: string;
  membership_charge: number;
  meeting_fine: number;
  working_month: string;
  otp: [string, string, string, string, string, string];

  auth_status: AuthStatus;
};

export default ProfileState;
