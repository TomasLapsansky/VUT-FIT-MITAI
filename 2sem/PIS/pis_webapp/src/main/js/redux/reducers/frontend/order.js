import {CLEAR_ORDER, CREATE_ORDER} from "../../actionTypes";

const initialState = {
    order: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ORDER:
            return Object.assign({}, state, action.payload);
        case CLEAR_ORDER:
            return initialState;
        default:
            return state;
    }
}