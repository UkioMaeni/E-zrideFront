import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {stepReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import {orderReducer} from "./reducers/orderReducer";

const rootReducer=combineReducers({
    step:stepReducer,
    user:userReducer,
    order:orderReducer
})


export const store=configureStore({
    reducer:rootReducer
})