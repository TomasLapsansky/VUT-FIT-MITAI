import {LOAD_PRODUCT_LIST, REMOVE_PRODUCT_FROM_LIST} from "../../actionTypes";

const initialState = {
    products: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCT_LIST:
            return Object.assign({}, state, action.payload);
        case REMOVE_PRODUCT_FROM_LIST:
            return Object.assign({}, state, {
                products:
                    state.products.filter( (product) => {
                        if (product) {
                            if (product.id !== action.id) {
                                return product;
                            }
                        }
                    }) });
        default:
            return state;
    }
}