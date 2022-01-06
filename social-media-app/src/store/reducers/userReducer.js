import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    users: [],
    currentUserName: {}
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USERS:
            return { ...state, users: action.payload };
        case ActionTypes.SET_CURRENT_USER_NAME:
            return { ...state, currentUserName: action.payload };
        default:
            return state;
    }
};