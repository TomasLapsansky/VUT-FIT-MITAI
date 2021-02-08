import {SET_ACTIVE_PRODUCT_IMAGE} from "../../actionTypes";

const initialState = {
    image: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_PRODUCT_IMAGE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}