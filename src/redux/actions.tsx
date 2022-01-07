import { SET_USER } from "./actionTypes";
import { User } from '../types/user';

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
})
