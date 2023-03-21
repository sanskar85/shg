import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreNames} from '../config';
import LoanState from '../types/LoanState';

const initialState: LoanState = {
  principle_pending1: 0,
  principle_pending2: 0,
  principle_pending2_5: 0,

  principle_previous1_before15: 0,
  principle_previous1_after15: 0,
  principle_previous2_before15: 0,
  principle_previous2_after15: 0,
  principle_previous2_5_before15: 0,
  principle_previous2_5_after15: 0,

  amount1_before15: 0,
  amount1_after15: 0,
  amount2_before15: 0,
  amount2_after15: 0,
  amount2_5_before15: 0,
  amount2_5_after15: 0,

  recovery1_before15: 0,
  recovery1_after15: 0,
  recovery2_before15: 0,
  recovery2_after15: 0,
  recovery2_5_before15: 0,
  recovery2_5_after15: 0,

  interest1: 0,
  interest2: 0,
  interest2_5: 0,

  interest_pending1: 0,
  interest_pending2: 0,
  interest_pending2_5: 0,

  membership: 0,
  membership_pending: 0,

  fine_charged: 0,
  fine_pending: 0,
  fine_paid: 0,

  meeting_recovery: 0,
  daily_recovery: 0,

  extra_fine_charged: 0,
  extra_fine_pending: 0,
  extra_fine_paid: 0,

  deduction2_5: 0,
};

const LoanSlice = createSlice({
  name: StoreNames.LOAN,
  initialState,
  reducers: {
    reset: state => {
      state.principle_pending1 = 0;
      state.principle_pending2 = 0;
      state.principle_pending2_5 = 0;

      state.principle_previous1_before15 = 0;
      state.principle_previous1_after15 = 0;
      state.principle_previous2_before15 = 0;
      state.principle_previous2_after15 = 0;
      state.principle_previous2_5_before15 = 0;
      state.principle_previous2_5_after15 = 0;

      state.amount1_before15 = 0;
      state.amount1_after15 = 0;
      state.amount2_before15 = 0;
      state.amount2_after15 = 0;
      state.amount2_5_before15 = 0;
      state.amount2_5_after15 = 0;

      state.interest1 = 0;
      state.interest2 = 0;
      state.interest2_5 = 0;

      state.interest_pending1 = 0;
      state.interest_pending2 = 0;
      state.interest_pending2_5 = 0;

      state.membership = 0;
      state.membership_pending = 0;

      state.fine_charged = 0;
      state.fine_pending = 0;
      state.fine_paid = 0;

      state.meeting_recovery = 0;
      state.daily_recovery = 0;

      state.extra_fine_paid = 0;
      state.extra_fine_charged = 0;
      state.extra_fine_pending = 0;

      state.deduction2_5 = 0;
    },

    setLoanDetails: (state, action: PayloadAction<LoanState>) => {
      state.principle_pending1 = action.payload.principle_pending1;
      state.principle_pending2 = action.payload.principle_pending2;
      state.principle_pending2_5 = action.payload.principle_pending2_5;

      state.principle_previous1_before15 =
        action.payload.principle_previous1_before15;
      state.principle_previous1_after15 =
        action.payload.principle_previous1_after15;
      state.principle_previous2_before15 =
        action.payload.principle_previous2_before15;
      state.principle_previous2_after15 =
        action.payload.principle_previous2_after15;
      state.principle_previous2_5_before15 =
        action.payload.principle_previous2_5_before15;
      state.principle_previous2_5_after15 =
        action.payload.principle_previous2_5_after15;

      state.amount1_before15 = action.payload.amount1_before15;
      state.amount1_after15 = action.payload.amount1_after15;
      state.amount2_before15 = action.payload.amount2_before15;
      state.amount2_after15 = action.payload.amount2_after15;
      state.amount2_5_before15 = action.payload.amount2_5_before15;
      state.amount2_5_after15 = action.payload.amount2_5_after15;

      state.recovery1_before15 = action.payload.recovery1_before15;
      state.recovery1_after15 = action.payload.recovery1_after15;
      state.recovery2_before15 = action.payload.recovery2_before15;
      state.recovery2_after15 = action.payload.recovery2_after15;
      state.recovery2_5_before15 = action.payload.recovery2_5_before15;
      state.recovery2_5_after15 = action.payload.recovery2_5_after15;

      state.interest1 = action.payload.interest1;
      state.interest2 = action.payload.interest2;
      state.interest2_5 = action.payload.interest2_5;

      state.interest_pending1 = action.payload.interest_pending1;
      state.interest_pending2 = action.payload.interest_pending2;
      state.interest_pending2_5 = action.payload.interest_pending2_5;

      state.membership = action.payload.membership;
      state.membership_pending = action.payload.membership_pending;

      state.fine_charged = action.payload.fine_charged;
      state.fine_pending = action.payload.fine_pending;
      state.fine_paid = action.payload.fine_paid;

      state.meeting_recovery = action.payload.meeting_recovery;
      state.daily_recovery = action.payload.daily_recovery;

      state.extra_fine_paid = action.payload.extra_fine_paid;
      state.extra_fine_charged = action.payload.extra_fine_charged;
      state.extra_fine_pending = action.payload.extra_fine_pending;

      state.deduction2_5 = action.payload.deduction2_5;
    },

    setPrinciplePrevious1_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.principle_previous1_before15 = action.payload;
      }
    },
    setPrinciplePrevious1_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.principle_previous1_after15 = action.payload;
      }
    },
    setPrinciplePrevious2_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.principle_previous2_before15 = action.payload;
      }
    },
    setPrinciplePrevious2_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.principle_previous2_after15 = action.payload;
      }
    },
    setPrinciplePrevious2_5_before15: (
      state,
      action: PayloadAction<number>,
    ) => {
      if (!isNaN(action.payload)) {
        state.principle_previous2_5_before15 = action.payload;
      }
    },
    setPrinciplePrevious2_5_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.principle_previous2_5_after15 = action.payload;
      }
    },
    setAmount1_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount1_before15 = action.payload;
      }
    },
    setAmount1_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount1_after15 = action.payload;
      }
    },
    setAmount2_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount2_before15 = action.payload;
      }
    },
    setAmount2_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount2_after15 = action.payload;
      }
    },
    setAmount2_5_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount2_5_before15 = action.payload;
      }
    },
    setAmount2_5_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.amount2_5_after15 = action.payload;
      }
    },
    setRecovery1_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery1_before15 = action.payload;
      }
    },
    setRecovery1_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery1_after15 = action.payload;
      }
    },
    setRecovery2_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery2_before15 = action.payload;
      }
    },
    setRecovery2_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery2_after15 = action.payload;
      }
    },
    setRecovery2_5_before15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery2_5_before15 = action.payload;
      }
    },
    setRecovery2_5_after15: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.recovery2_5_after15 = action.payload;
      }
    },
    setInterest1: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.interest1 = action.payload;
      }
    },
    setInterest2: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.interest2 = action.payload;
      }
    },
    setInterest2_5: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.interest2_5 = action.payload;
      }
    },
    setMembership: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.membership = action.payload;
      }
    },
    setFineCharged: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.fine_charged = action.payload;
      }
    },
    setFinePaid: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.fine_paid = action.payload;
      }
    },
    setMeetingRecovery: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.meeting_recovery = action.payload;
      }
    },
    setDailyRecovery: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.daily_recovery = action.payload;
      }
    },
    setExtraFinePaid: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.extra_fine_paid = action.payload;
      }
    },
    setExtraFineCharged: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.extra_fine_charged = action.payload;
      }
    },
    setExtraFinePending: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.extra_fine_pending = action.payload;
      }
    },
    setDeduction2_5: (state, action: PayloadAction<number>) => {
      if (!isNaN(action.payload)) {
        state.deduction2_5 = action.payload;
      }
    },
  },
});

export const {
  reset,
  setLoanDetails,
  setPrinciplePrevious2_5_before15,
  setPrinciplePrevious2_5_after15,
  setPrinciplePrevious2_before15,
  setPrinciplePrevious2_after15,
  setPrinciplePrevious1_before15,
  setPrinciplePrevious1_after15,
  setAmount1_after15,
  setAmount1_before15,
  setAmount2_after15,
  setAmount2_before15,
  setAmount2_5_after15,
  setAmount2_5_before15,
  setRecovery1_after15,
  setRecovery1_before15,
  setRecovery2_after15,
  setRecovery2_before15,
  setRecovery2_5_after15,
  setRecovery2_5_before15,
  setInterest1,
  setInterest2,
  setInterest2_5,
  setMembership,
  setFineCharged,
  setFinePaid,
  setMeetingRecovery,
  setDailyRecovery,
  setExtraFinePaid,
  setExtraFineCharged,
  setExtraFinePending,
  setDeduction2_5,
} = LoanSlice.actions;

export default LoanSlice.reducer;
