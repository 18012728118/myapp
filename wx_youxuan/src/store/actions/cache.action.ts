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

export const LOADSUBJECTLIST = "[Cache] LOADSUBJECTLIST";
export class LoadSubjectList implements Action {
    readonly type = LOADSUBJECTLIST
    constructor(public payload?: any) {
    }
}
export const LOADSUBJECTLISTSUCCESS = "[Cache] LOADSUBJECTLISTSUCCESS";
export class LoadSubjectListSuccess implements Action {
    readonly type = LOADSUBJECTLISTSUCCESS
    constructor(public payload: any) {
    }
}

export const LOADSUBJECT = "[Cache] LOADSUBJECT";
export class LoadSubject implements Action {
    readonly type = LOADSUBJECT
    constructor(public payload?: any) {
    }
}
export const LOADSUBJECTSUCCESS = "[Cache] LOADSUBJECTSUCCESS";
export class LoadSubjectSuccess implements Action {
    readonly type = LOADSUBJECTSUCCESS
    constructor(public payload: any) {
    }
}


export const LOADSETTING = "[Cache] LOADSETTING";
export class LoadSetting implements Action {
    readonly type = LOADSETTING
}
export const LOADSETTINGSUCCESS = "[Cache] LOADSETTINGSUCCESS";
export class LoadSettingSuccess implements Action {
    readonly type = LOADSETTINGSUCCESS
    constructor(public payload: any) {
    }
}

export type All =
    Save |
    Init |
    LoadShopOrders |
    LoadShopOrdersSuccess |
    LoadSubjectList |
    LoadSubjectListSuccess |
    LoadSubject |
    LoadSubjectSuccess |
    LoadSetting |
    LoadSettingSuccess |
    LoadError; 