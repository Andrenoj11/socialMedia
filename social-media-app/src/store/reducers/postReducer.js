import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    posts: [],
    specificPost: {},
    comments: []
};

export const postReducer = (state = initialState, action) => {
    console.log(action.postId, 'inioi', state?.posts?.data?.filter(post => post.id !== action.postId));
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return { ...state, posts: action.payload };
        case ActionTypes.SET_SPECIFIC_POST:
            return { ...state, specificPost: action.payload };
        case ActionTypes.DELETE_POST:
            return { ...state, posts: action.payload };
        case ActionTypes.ADD_POST:
            return { ...state, posts: action.payload };
        case ActionTypes.EDIT_POST:
            return { ...state, posts: action.payload };
        case ActionTypes.SET_COMMENTS:
            return { ...state, comments: action.payload };
        case ActionTypes.DELETE_COMMENT:
            return { ...state, comments: action.payload };
        case ActionTypes.ADD_COMMENT:
            return { ...state, comments: action.payload };
        case ActionTypes.EDIT_COMMENT:
            return { ...state, comments: action.payload };
        default:
            return state;
    }
};