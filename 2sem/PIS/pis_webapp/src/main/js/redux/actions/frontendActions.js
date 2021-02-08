import {
    ADD_CART_ITEM,
    CLEAR_CART,
    CLEAR_ORDER,
    CREATE_ORDER,
    LOAD_CATEGORIES, REMOVE_CART_ITEM,
    SET_ACTIVE_PRODUCT_IMAGE, UPDATE_LOGIN_USER, USER_LOGIN, USER_LOGOUT
} from "../actionTypes";

export const loadCategories = categoryArray => ({
    type: LOAD_CATEGORIES,
    payload: {
        categories: categoryArray
    }
});

export const setActiveProductImage = image => ({
    type: SET_ACTIVE_PRODUCT_IMAGE,
    payload : {
        image: image
    }
});

export const addCartItem = cartItem => ({
   type: ADD_CART_ITEM,
   payload: {
       cartItem: cartItem
   }
});

export const removeCartItem = id => ({
    type: REMOVE_CART_ITEM,
    id: id
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const createOrder = order => ({
   type: CREATE_ORDER,
   payload: {
       order: order
   }
});

export const clearOrder = () => ({
   type: CLEAR_ORDER
});

export const updateLoginUser = user => ({
    type: UPDATE_LOGIN_USER,
    payload: {
        user: user
    }
});


