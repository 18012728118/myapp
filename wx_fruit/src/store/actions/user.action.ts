//redux base
import { Action } from "@ngrx/store";
import { ShopAddress } from "../../models/shopAddress.model";

export const INITDATA = "[USER] INITDATA";
export class Init implements Action {
    readonly type = INITDATA
}


export const LOADSUCCESS = "[USER] 加载成功";
export class LoadSuccess implements Action {
    readonly type = LOADSUCCESS
    constructor(public payload: any) {
    }
}


export const LOADERROR = "[USER] LOADERROR";
export class LoadError implements Action {
    readonly type = LOADERROR
    constructor(public payload: string) {
    }
}


//删除地址
export const DELETEADDRESS = "[USER] 删除地址";
export const DELETEADDRESSSUCCESS = "[USER] DELETEADDRESSSUCCESS";

export class DeleteAddress implements Action {
    readonly type = DELETEADDRESS
    constructor(public payload: ShopAddress) {
    }
}
export class DeleteAddressSuccess implements Action {
    readonly type = DELETEADDRESSSUCCESS
    constructor(public payload: number) {
    }
}

//添加地址
export const ADDADDRESS = "[USER] 新增地址";
export const ADDADDRESSSUCCESS = "[USER] ADDADDRESSSUCCESS";
export class AddAddress implements Action {
    readonly type = ADDADDRESS
    constructor(public payload: ShopAddress) {
    }
}
export class AddAddressSuccess implements Action {
    readonly type = ADDADDRESSSUCCESS
    constructor(public payload: ShopAddress) {
    }
}

export const SETADDRESS = "[USER] 设置默认地址";
export const SETADDRESSOK = "[USER] 设置默认地址-成功";
export class SetAddress implements Action {
    readonly type = SETADDRESS
    constructor(public payload: number) {
    }
}
export class SetAddressOk implements Action {
    readonly type = SETADDRESSOK
    constructor(public payload: number) {
    }
}

export type Actions =
    Init
    | LoadSuccess
    | LoadError
    | DeleteAddress
    | DeleteAddressSuccess
    | AddAddress
    | AddAddressSuccess
    | SetAddress
    | SetAddressOk;