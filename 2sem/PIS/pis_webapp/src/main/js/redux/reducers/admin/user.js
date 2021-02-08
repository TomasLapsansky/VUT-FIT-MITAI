import { UPDATE_USER } from "../../actionTypes";

const initialState = {
  user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}