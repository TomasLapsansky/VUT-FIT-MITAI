import {LOAD_CATEGORY_LIST} from "../../actionTypes";

const initialState = {
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_CATEGORY_LIST:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}