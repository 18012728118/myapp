import { Action } from "@ngrx/store"


export interface CachePayload {
    key: string,
    value: any
}


export const SAVE = "[Cache] SAVE"
export class Save implements Action {
    readonly type = SAVE
    constructor(public payload: CachePayload) {
    }
}

export const INIT = "[Cache] INIT FROM HTTP"
export class Init implements Action {
    readonly type = INIT
    constructor(public payload: Cache) {
    }
}

export const LOADERROR = "[Cache] LOADERROR";
export class LoadError implements Action {
    readonly type = LOADERROR
    constructor(public payload: any) {
    }
}


export const LOADSHOPORDERS = "[Cache] LOADSHOPORDERS";
export class LoadShopOrders implements Action {
    readonly type = LOADSHOPORDERS
    constructor(public payload?: any) {
    }
}
export const LOADSHOPORDERSSUCCESS = "[Cache] LOADSHOPORDERSSUCCESS";
export class LoadShopOrdersSuccess implements Action {
    readonly type = LOADSHOPORDERSSUCCESS
    constructor(public payload: any) {
    }
}


export type All =
    Save |
    Init |
    LoadShopOrders |
    LoadShopOrdersSuccess |
    LoadError; 