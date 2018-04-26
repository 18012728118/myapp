import { Shop, ShopItem, ShareData } from "../../models/shop.model";
import { ShopCategory } from "../../models/shopCategory.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CacheState {
    shop: Shop,
    itemList: ShopItem[],
    categoryList: ShopCategory[],
    error: any,

    total: number,
    totalPrice: number,
    totalVipPrice: number
    cartItems: ShopItem[],
    selectAddress: any,
    payType: string,
    comment: string
}


export const getCahceState = createFeatureSelector<CacheState>('cache');
export const getTotal = createSelector(
    getCahceState,
    (state: CacheState) => state.total
);
export const getShop = createSelector(
    getCahceState,
    (state: CacheState) => state.shop
);
