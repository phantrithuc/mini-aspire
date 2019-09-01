import { createAction } from 'redux-actions';
import * as types from './types';

const beginCall = createAction(types.BEGIN_CALL);
const endCall = createAction(types.END_CALL);
export default { beginCall, endCall };
