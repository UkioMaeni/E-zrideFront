import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {stepReducer} from "./reducers/authReducer";

const rootReducer=combineReducers({
    step:stepReducer
})


export const store=configureStore({
    reducer:rootReducer
})