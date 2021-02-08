import {ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM} from "../../actionTypes";

const initialState = {
    cartItemList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CART_ITEM:
            let exists = false;
            state.cartItemList.map(item => {
                if (item.productDto.id === action.payload.cartItem.productId) {
                    exists = true;
                }
            });
            if (exists) {
                return Object.assign({}, state, {
                    cartItemList: state.cartItemList.map( item => {
                        if (item.productDto.id === action.payload.cartItem.productId) {
                            return Object.assign({}, item, {amount: item.amount++});
                        }
                        else {
                            return item;
                        }
                    })
                });
            }
            return Object.assign({}, state, {
                cartItemList: [...state.cartItemList, action.payload.cartItem]
            });
        case REMOVE_CART_ITEM:
            return Object.assign({}, state, {
                cartItemList: state.cartItemList.filter( cartItem => {
                    if (cartItem.id !== action.id)
                        return cartItem;
                })
            });
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
}