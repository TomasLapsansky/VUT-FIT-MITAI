import {
    CLEAR_IMAGES,
    DELETE_IMAGE, LOAD_CATEGORY_LIST,
    LOAD_PRODUCT_LIST,
    LOAD_USER_LIST, REMOVE_PRODUCT_FROM_LIST, UPDATE_CATEGORY,
    UPDATE_IMAGE,
    UPDATE_PRODUCT,
    UPDATE_USER
} from "../actionTypes";

export const loadUserList = userArray => ({
    type: LOAD_USER_LIST,
    payload: {
        users: userArray
    }
});

export const loadProductList = productArray => ({
    type: LOAD_PRODUCT_LIST,
    payload: {
        products: productArray
    }
});

export const removeProductFromList = id => ({
    type: REMOVE_PRODUCT_FROM_LIST,
    id: id
});

export const updateUser = user => ({
    type: UPDATE_USER,
    payload: {
        user: user
    }
});

export const updateProduct = product => ({
    type: UPDATE_PRODUCT,
    payload: {
        product: product
    }
});

export const updateImage = image => ({
    type: UPDATE_IMAGE,
    payload: {
        images: image
    }
});

export const deleteImage = id => ({
    type: DELETE_IMAGE,
    id: id
});

export const clearImages = () => ({
    type: CLEAR_IMAGES,
});

export const loadCategoryList = categoryList => ({
    type: LOAD_CATEGORY_LIST,
    payload: {
        categories: categoryList
    }
});

export const updateCategory = category => ({
    type: UPDATE_CATEGORY,
    payload: {
        category: category
    }
});