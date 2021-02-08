import {LOAD_USER_LIST} from "../../actionTypes";

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_LIST:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}