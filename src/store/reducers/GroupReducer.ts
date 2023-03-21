import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreNames} from '../config';
import GroupState from '../types/GroupState';

const initialState: GroupState = {
  groups: [],
};

const GroupSlice = createSlice({
  name: StoreNames.GROUP,
  initialState,
  reducers: {
    reset: state => {
      state.groups = [];
    },
    addGroup: (state, action: PayloadAction<string>) => {
      state.groups.push(action.payload);
      state.groups = state.groups.sort();
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(group => group !== action.payload);
      state.groups = state.groups.sort();
    },
    setGroups: (state, action: PayloadAction<string[]>) => {
      state.groups = action.payload;
      state.groups = state.groups.sort();
    },
  },
});

export const {reset, addGroup, removeGroup, setGroups} = GroupSlice.actions;

export default GroupSlice.reducer;
