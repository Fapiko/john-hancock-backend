import { SET_USER } from "../actionTypes";
import {AnyAction} from "@reduxjs/toolkit";

const initialState = {
}

export default function (state = initialState, action: AnyAction) {
    switch(action.type) {
        case SET_USER:
            const user = action.payload;
            return user
        default:
            return state;
    }
}
