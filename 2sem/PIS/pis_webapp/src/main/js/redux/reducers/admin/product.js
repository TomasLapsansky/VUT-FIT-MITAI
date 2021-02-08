import {UPDATE_IMAGE, UPDATE_PRODUCT} from "../../actionTypes";

const initialState = {
  product: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}