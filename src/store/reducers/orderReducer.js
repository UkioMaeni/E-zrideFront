import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState={
    from:{},
    to:{},
    waypoints:[]
}

export const SET_FROM=createAction('SET_FROM')
export const SET_TO=createAction('SET_TO')
export const ADD_POINT=createAction('ADD_POINT')

export const orderReducer=createReducer(initialState,{
    SET_FROM:function (state, action){
        state.from=action.payload
    },
    SET_TO:function (state, action){
        state.to=action.payload
    },
    ADD_POINT:function (state, action){
        state.waypoints.push(action.payload)
    }
})