import { Action } from "@ngrx/store"
import { KanJiaUser } from "../types/kanJiaUser.Model"

export const UPDATE = "[KANJIAUSER] UPDATE"

export class Update implements Action {
    readonly type = UPDATE
    constructor(public payload: KanJiaUser) {
    }
}

export type All =
    Update;