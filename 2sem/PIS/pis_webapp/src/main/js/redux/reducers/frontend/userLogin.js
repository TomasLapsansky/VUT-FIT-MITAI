import {UPDATE_LOGIN_USER} from "../../actionTypes";

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOGIN_USER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}