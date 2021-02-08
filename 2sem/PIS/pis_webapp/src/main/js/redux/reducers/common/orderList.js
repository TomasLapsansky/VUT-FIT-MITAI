import {LOAD_ORDER_LIST} from "../../actionTypes";

const initialState = {
    orders: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDER_LIST:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}