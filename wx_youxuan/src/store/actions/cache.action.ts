import { Action } from "@ngrx/store"
import { Cache } from "../types/cache.model";

export const SAVE = "[Cache] SAVE"
export const INIT = "[Cache] INIT FROM HTTP"

export interface CachePayload {
    key: string,
    value: any
}


export class Save implements Action {
    readonly type = SAVE
    constructor(public payload: CachePayload) {
    }
}

export class Init implements Action {
    readonly type = INIT
    constructor(public payload: Cache) {
    }
}

export type All =
    Save |
    Init; 