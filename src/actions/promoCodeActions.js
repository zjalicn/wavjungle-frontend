import { promoCodeConstants } from '../constants/constants';

export const handleChange = e => dispatch => {
    dispatch({
        type: promoCodeConstants.PROMO_CODE,
        payload: e.target.value
    });
};