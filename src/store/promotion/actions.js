import {
  getPromotions,
  generatePromoCode,
  deletePromotion,
} from './../../api/promotions.js';

import {
  resultOK,
} from './../../api/utils.js';


export const PROMOTIONS_LIST = 'PROMOTIONS_LIST';
export const GENERATED_PROMO_CODE = 'GENERATED_PROMO_CODE';
export const PROMOTION_DELETED= 'PROMOTION_DELETED';


export function GET_PROMOTIONS() {
  return async (dispatch) => {
    const result = await getPromotions();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.promo_codes) || [];
    dispatch({ type: PROMOTIONS_LIST, data });
  };
}

export function GET_PROMO_CODE() {
  return async (dispatch) => {
    const result = await generatePromoCode();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.code) || null;
    dispatch({ type: GENERATED_PROMO_CODE, data });
  };
}

export function DELETE_PROMOTION(id) {
  return async (dispatch) => {
    const result = await deletePromotion(id);
    console.log(result);
    dispatch({ type: PROMOTION_DELETED, data: true });
  }
}
