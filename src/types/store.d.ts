import {store} from '../store';

type StoreType = typeof store;
type StoreState = ReturnType<typeof store.getState>;

export default StoreState;
export {StoreType};
