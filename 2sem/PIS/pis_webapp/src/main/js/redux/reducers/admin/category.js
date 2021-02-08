import { UPDATE_CATEGORY } from "../../actionTypes";

const initialState = {
    category: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORY:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}