import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import StringHelper from '../../helpers/StringHelper';
import {StoreNames} from '../config';
import ProfileState from '../types/ProfileState';

export enum AuthStatus {
  OTP_NOT_SEND = 'otp-not-send',
  OTP_SENT = 'otp-sent',
  OTP_VERIFIED = 'otp-verified',
}

const initialState: ProfileState = {
  name: '',
  phone: '',
  membership_charge: 0,
  meeting_fine: 0,
  working_month: '',
  otp: ['', '', '', '', '', ''],

  auth_status: AuthStatus.OTP_NOT_SEND,
};

const ProfileSlice = createSlice({
  name: StoreNames.PROFILE,
  initialState,
  reducers: {
    reset: state => {
      state.name = initialState.name;
      state.phone = initialState.phone;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setMembershipCharge: (state, action: PayloadAction<number>) => {
      state.membership_charge = action.payload;
    },
    setMeetingFine: (state, action: PayloadAction<number>) => {
      state.meeting_fine = action.payload;
    },
    setWorkingMonth: (state, action: PayloadAction<string>) => {
      state.working_month = action.payload;
    },
    setDetails: (
      state,
      action: PayloadAction<Partial<Omit<ProfileState, 'otp' | 'auth_status'>>>,
    ) => {
      if (action.payload === null) {
        return;
      }
      const {name, phone, membership_charge} = action.payload;

      if (
        name !== undefined &&
        (StringHelper.isEmpty(name) === false || name === '')
      ) {
        state.name = name;
      }

      if (
        phone !== undefined &&
        (StringHelper.isEmpty(phone) === false || phone === '')
      ) {
        state.phone = phone;
      }

      if (membership_charge !== undefined) {
        state.membership_charge = membership_charge;
      }

      if (action.payload.meeting_fine !== undefined) {
        state.meeting_fine = action.payload.meeting_fine;
      }

      if (action.payload.working_month !== undefined) {
        state.working_month = action.payload.working_month;
      }
    },
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.auth_status = action.payload;
      if (action.payload === AuthStatus.OTP_NOT_SEND) {
        state.otp = initialState.otp;
      }
    },
    resetOTP: state => {
      state.otp = initialState.otp;
    },
    setOTP: (state, action: PayloadAction<typeof initialState.otp>) => {
      state.otp = action.payload;
    },
  },
});

export const {
  reset,
  setName,
  setPhone,
  setMembershipCharge,
  setMeetingFine,
  setWorkingMonth,
  setDetails,
  setAuthStatus,
  setOTP,
  resetOTP,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
