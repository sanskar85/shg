import {configureStore} from '@reduxjs/toolkit';
import {LoadGroupDetails, LoadMemberDetails, LoadUserDetails} from './config';
import GroupReducer from './reducers/GroupReducer';
import LoanReducer from './reducers/LoanReducer';
import MemberReducer from './reducers/MemberReducer';
import ProfileReducer from './reducers/ProfileReducer';

const store = configureStore({
  reducer: {
    profile: ProfileReducer,
    group: GroupReducer,
    member: MemberReducer,
    loan: LoanReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const LoadStoreData = async () => {
  LoadUserDetails(store);
  LoadGroupDetails(store);
  LoadMemberDetails(store);
};

export default store;
export {LoadStoreData};
