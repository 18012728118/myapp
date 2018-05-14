import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CacheState {
    WxUser: any;
    store: any;
    token: any;
    BuyItemList: any;
    SlideList: any;
    ShopList: any;
    ShopOrders: any;
    isAdmin: boolean;
}



export const getCahceState = createFeatureSelector<CacheState>('cache');
export const getShopOrders = createSelector(
    getCahceState,
    (state: CacheState) => state.ShopOrders
);

export const getStore = createSelector(
    getCahceState,
    (state: CacheState) => state.store
);