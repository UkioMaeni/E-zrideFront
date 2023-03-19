import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState={
    step:'Registration',
    type:'phone'
}

export const SET_STEP=createAction('SET_STEP')
export const SET_TYPE=createAction('SET_TYPE')

export const stepReducer=createReducer(initialState,{
    SET_STEP:function (state,action){
        state.step=action.payload
    },
    SET_TYPE:function (state,action){
        state.type=action.payload
    }
})