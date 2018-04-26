
import { Cache } from "../types/cache.model"

import * as CacheActions from "../actions/cache.action";

export type Action = CacheActions.All;

const defaultCache: Cache = {
    WxUser: null,
    store: null,
    token: null,
    BuyItemList: null,
    SlideList: null
}

export function cacheReducer(state: Cache = defaultCache, action: Action) {
    switch (action.type) {
        case CacheActions.SAVE:
            return { ...state, [action.payload.key]: action.payload.value }
        case CacheActions.INIT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}