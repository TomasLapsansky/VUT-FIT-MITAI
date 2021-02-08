import {LOAD_ORDER} from "../../actionTypes";

const initialState = {
    order: {
        orderItemsDto: [],
        user: {}
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}