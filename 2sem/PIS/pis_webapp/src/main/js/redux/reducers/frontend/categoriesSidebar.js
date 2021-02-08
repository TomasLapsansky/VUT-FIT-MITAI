import {LOAD_CATEGORIES} from "../../actionTypes";

const initialState = {
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}