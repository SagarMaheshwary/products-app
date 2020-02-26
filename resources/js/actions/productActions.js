import {
    GET_PRODUCTS,
    GET_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    ADD_PRODUCT,
    VALIDATION_FAILED,
    CLEAR_ERRORS
} from "../action-types";
import Axios from "axios";

/**
 * Get all the products.
 */
export const getProducts = () => async dispatch => {
    try {
        const response = await Axios.get('/api/products');
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products || []
        });
    } catch (err) {
        console.log(err)
    }
}

/**
 * Get the specified product.
 * 
 * @param {*} id 
 */
export const getProduct = (id) => async dispatch => {
    try {
        const response = await Axios.get(`/api/products/${id}`);

        dispatch({
            type: GET_PRODUCT,
            payload: response.data.product || {}
        });
    } catch (err) {
        console.log(err)
    }
}

/**
 * Create a new product.
 * 
 * @param {object} product 
 */
export const addProduct = (product) => async dispatch => {
    try {
        const response = await Axios.post('/api/products', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({
            type: ADD_PRODUCT,
            payload: response.data.product
        });
        dispatch(clearErrors());

        return true;
    } catch (err) {
        if (err.response && err.response.status == 422) {
            dispatch({
                type: VALIDATION_FAILED,
                payload: err.response.data.errors || []
            });
        }

        return false;
    }
}

/**
 * Update the specified product.
 * 
 * @param {number} id 
 * @param {object} product 
 */
export const updateProduct = (id, product) => async dispatch => {
    try {
        const response = await Axios.post(`/api/products/${id}`, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data
        });
        dispatch(clearErrors());

        return true;
    } catch (err) {
        if (err.response && err.response.status == 422) {
            dispatch({
                type: VALIDATION_FAILED,
                payload: err.response.data.errors || []
            });
        }
        console.log(err)
        return false;
    }
}

/**
 * Delete the specified product.
 * 
 * @param {number} id 
 */
export const deleteProduct = (id) => async dispatch => {
    try {
        await Axios.delete(`/api/products/${id}`);

        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });

        return true;
    } catch (err) {
        console.log(err);

        return false;
    }
}

/**
 * Clear validation errors.
 */
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    });
}