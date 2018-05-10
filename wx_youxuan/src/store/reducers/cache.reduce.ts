

import * as CacheActions from "../actions/cache.action";
import { CacheState } from "../state/cache.State";

export type Action = CacheActions.All;

const defaultCache: CacheState = {
    WxUser: null,
    store: null,
    token: null,
    BuyItemList: null,
    SlideList: null,
    ShopList:null
}

export function cacheReducer(state: CacheState = defaultCache, action: Action) {
    switch (action.type) {
        case CacheActions.SAVE:
            return { ...state, [action.payload.key]: action.payload.value }
        case CacheActions.INIT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}