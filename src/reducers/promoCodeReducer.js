import { promoCodeConstants } from '../constants/constants';

const initialState = {
    value: ''
}

export function promoCode(state = initialState, action) {
    switch(action.type) {
        case promoCodeConstants.PROMO_CODE:
            return {
                ...state,
                value: action.payload
            };
            default:
                return state;
    }
};