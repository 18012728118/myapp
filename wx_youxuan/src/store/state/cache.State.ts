import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CacheState {
    WxUser: any;
    store: any;
    token: any;
    BuyItemList: any;
    SlideList: any;
    ShopList: any;
    ShopOrders: any;
    SubjectList: any;
    Subject: any;
    isAdmin: boolean;
    Partner: { Realname: string, Phone: string, AvblBalance: number, UnavblBalance: number, TotalWithdrawals: number, Introducting: string, Review: string, State: number, UpdateDate: Date };
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

export const getSubjectList = createSelector(
    getCahceState,
    (state: CacheState) => state.SubjectList
);

export const getSubject = createSelector(
    getCahceState,
    (state: CacheState) => state.Subject
);

export const getPartner = createSelector(
    getCahceState,
    (state: CacheState) => state.Partner
);

export const getWxUser = createSelector(
    getCahceState,
    (state: CacheState) => state.WxUser
);
