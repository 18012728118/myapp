//redux base
import { Action } from "@ngrx/store";
import { CacheState } from "../states/cache.state";
import { ShopItem, ShareData } from "../../models/shop.model";

export const INIT = "[Cache] INIT";
export class Init implements Action {
    readonly type = INIT
}

export const RELOAD = "[Cache] 重新加载";
export class ReLoad implements Action {
    readonly type = RELOAD
}


export const INITSUCCESS = "[Cache] 加载成功";
export class LoadSuccess implements Action {
    readonly type = INITSUCCESS
    constructor(public payload: any) {
    }
}

export const LOADERROR = "[Cache] LOADERROR";
export class LoadError implements Action {
    readonly type = LOADERROR
    constructor(public payload: any) {
    }
}

export const ADDTOCART = '[Cache] ADDTOCART';
export const REMOVECART = '[Cache] REMOVECART';
export const RESET = '[Cache] Reset';
export const RESET_SUCCESS = '[Cache] ResetSucess';

export class AddToCart implements Action {
    readonly type = ADDTOCART;
}

export class RemoveCart implements Action {
    readonly type = REMOVECART;
}

export class ResetAction implements Action {
    readonly type = RESET;
}

export class ResetSuccessAction implements Action {
    readonly type = RESET_SUCCESS;
}

export const TOPAY = '[Cache] TOPAY'
export class ToPay implements Action {
    readonly type = TOPAY;
}

export const PAYPREREADY = '[Cache] PAYPREREADY'
export class PayReady implements Action {
    readonly type = PAYPREREADY;
    constructor(public payload: CacheState) { }
}

export const PAYSUCCESS = '[Cache] PAYSUCCESS'
export class PaySuccess implements Action {
    readonly type = PAYSUCCESS;
}

export const SELECTADDRESS = '[Cache] SELECTADDRESS'
export class SelectAddress implements Action {
    readonly type = SELECTADDRESS;
    constructor(public payload: any) {

    }
}

export const SETPAYTYPE = '[Cache] SETPAYTYPE'
export class SetPayType implements Action {
    readonly type = SETPAYTYPE;
    constructor(public payload: string) {

    }
}

export const SETUSERTELVALID = '[Cache] 手机验证成功'
export class SetUserTelValid implements Action {
    readonly type = SETUSERTELVALID;
    constructor() {
    }
}


export const CLEARADDRESSANDPAYTYPE = '[Cache] CLEARADDRESSANDPAYTYPE';
export class ClearAddressAndPayType implements Action {
    readonly type = CLEARADDRESSANDPAYTYPE;
}

export const SETCOMMNET = '[Cache] 设置留言';
export class SetComment implements Action {
    readonly type = SETCOMMNET;
    constructor(public payload: string) { }
}

export type Actions =
    Init
    | ReLoad
    | LoadSuccess
    | LoadError
    | AddToCart
    | RemoveCart
    | ResetAction
    | ResetSuccessAction
    | ToPay
    | PayReady
    | PaySuccess
    | SelectAddress
    | SetPayType
    | ClearAddressAndPayType
    | SetUserTelValid
    | SetComment
    ;