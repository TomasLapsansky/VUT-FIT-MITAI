import {CLEAR_IMAGES, DELETE_IMAGE, UPDATE_IMAGE} from "../../actionTypes";

const initialState = {
  images: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_IMAGE:
            return Object.assign({}, state, { images: [ ...state.images , action.payload.images ] });
        case DELETE_IMAGE:
            return Object.assign({}, state, {
                images:
                    state.images.filter( (image) => {
                    if (image) {
                        if (image.id !== action.id) {
                            return image;
                        }
                    }
                }) });
        case CLEAR_IMAGES:
            return initialState;
        default:
            return state;
    }
}