import {LOAD_ORDER, LOAD_ORDER_LIST, USER_LOGIN, USER_LOGOUT} from "../actionTypes";

export const userLogin = user => ({
    type: USER_LOGIN,
    payload: {
        user: user
    }
});

export const userLogout = () => ({
    type: USER_LOGOUT
});

export const loadOrderList = orderList => ({
    type: LOAD_ORDER_LIST,
    payload: {
        orders: orderList
    }
});

export const loadOrder = order => ({
    type: LOAD_ORDER,
    payload: {
        order: order
    }
});