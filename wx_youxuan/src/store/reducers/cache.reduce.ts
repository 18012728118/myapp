

import * as CacheActions from "../actions/cache.action";
import { CacheState } from "../state/cache.State";

export type Action = CacheActions.All;

const defaultCache: CacheState = {
    WxUser: null,
    store: null,
    token: null,
    BuyItemList: null,
    SlideList: null,
    ShopList: [],
    ShopOrders: null,
    SubjectList: [],
    Subject: {},
    Partner: { Realname: "", Phone: "", Introducting: "", Review: "", UpdateDate: new Date(), AvblBalance: 0, UnavblBalance: 0, TotalWithdrawals: 0, State: 0 },
    isAdmin: false
}

export function cacheReducer(state: CacheState = defaultCache, action: Action) {
    switch (action.type) {
        case CacheActions.SAVE:
            return { ...state, [action.payload.key]: action.payload.value }
        case CacheActions.INIT:
            return Object.assign({}, state, action.payload);
        case CacheActions.LOADSHOPORDERSSUCCESS:
            return Object.assign({}, state, { ShopOrders: action.payload });
        case CacheActions.LOADSUBJECTLISTSUCCESS:
            return Object.assign({}, state, { SubjectList: action.payload });
        case CacheActions.LOADSUBJECTSUCCESS:
            return Object.assign({}, state, { Subject: action.payload });
        case CacheActions.LOADSETTINGSUCCESS:
            return Object.assign({}, state, action.payload);
        case CacheActions.LOADBUYITEMLISTSUCCESS:
            state.BuyItemList = [...state.BuyItemList, ...action.payload.BuyItemList];
            console.log(state.BuyItemList);
            return state;
        default:
            return state;
    }
}