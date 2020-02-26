import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    VALIDATION_FAILED,
    CLEAR_ERRORS
} from '../action-types/index'

const initialState = {
    products: [],
    product: {
        name: '',
        description: '',
        price: '',
        quantity: ''
    },
    errors: {
        name: [],
        description: [],
        price: [],
        quantity: [],
        image: []
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            }
        case UPDATE_PRODUCT:
            let { products } = state
            const index = products.findIndex(product => product.id == payload.id)
            products[index] = payload

            return {
                ...state,
                products: products
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id != payload)
            }
        case VALIDATION_FAILED:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    ...payload
                }
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: initialState.errors
            }
        default:
            return state;
    }
}