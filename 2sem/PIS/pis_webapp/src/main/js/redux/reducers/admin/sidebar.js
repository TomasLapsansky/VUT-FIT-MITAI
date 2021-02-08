import { SET_ADMIN_MENU_ACTIVE} from "../../actionTypes";

const initialState = {
    adminMenuActive: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN_MENU_ACTIVE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}