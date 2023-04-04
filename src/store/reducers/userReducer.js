import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState={
    phone:'',
    otp:'',
    access:'',
    refresh:'',
    name:'',
    surname: '',
    date_of_birth:'',
    carList:''
}

export const SET_PHONE=createAction('SET_PHONE')
export const SET_CODE=createAction('SET_CODE')
export const SET_ACCESS=createAction('SET_ACCESS')
export const SET_USER_DATA=createAction('SET_USER_DATA')
export const SET_CAR=createAction('SET_CAR')
export const userReducer=createReducer(initialState,{
    SET_PHONE:function (state,action){
        state.phone=action.payload
    },
    SET_CODE:function (state,action){
        state.otp=action.payload
    },
    SET_ACCESS:function (state,action){
        state.access=action.payload
    },
    SET_USER_DATA:function (state ,action){
        const {name,surname,date_of_birth}=action.payload
        state.name=name
        state.surname=surname
        state.date_of_birth=date_of_birth
    },
    SET_CAR:function (state, action){
        state.carList=action.payload
    }
})