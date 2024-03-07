import {combineReducers} from "@reduxjs/toolkit"

import authSlice from './auth.slice'
import stateSlice from './actions.slice'
export * from './auth.slice'
export * from './actions.slice'

const rootReducer = combineReducers({
    auth: authSlice,
    state: stateSlice,
})

export default rootReducer;
