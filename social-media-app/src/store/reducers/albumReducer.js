import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    albums: [],
    specificAlbum: {},
    photos: [],
    specificPhoto: {}
};

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ALBUMS:
            return { ...state, albums: action.payload };
        case ActionTypes.SET_SPECIFIC_ALBUM:
            return { ...state, specificAlbum: action.payload };
        case ActionTypes.SET_PHOTOS:
            return { ...state, photos: action.payload };
        case ActionTypes.SET_SPECIFIC_PHOTO:
            return { ...state, specificPhoto: action.payload };
        default:
            return state;
    }
};