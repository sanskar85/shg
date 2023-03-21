import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreNames} from '../config';
import MemberState, {Member} from '../types/MemberState';

const initialState: MemberState = {
  members: [],
};

const MemberSlice = createSlice({
  name: StoreNames.MEMBER,
  initialState,
  reducers: {
    reset: state => {
      state.members = [];
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.push(action.payload);
      state.members = state.members.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    removeMember: (state, action: PayloadAction<Member['id']>) => {
      state.members = state.members.filter(
        member => member.id !== action.payload,
      );
    },
    updateMember: (state, action: PayloadAction<Omit<Member, 'group'>>) => {
      state.members = state.members.map(member => {
        if (member.id === action.payload.id) {
          member.name = action.payload.name;
          member.deposit = action.payload.deposit;
        }
        return member;
      });
    },

    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
  },
});

export const {reset, addMember, updateMember, removeMember, setMembers} =
  MemberSlice.actions;

export default MemberSlice.reducer;
