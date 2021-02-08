import {USER_LOGIN, USER_LOGOUT} from "../../actionTypes";

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, action.payload);
        case USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}