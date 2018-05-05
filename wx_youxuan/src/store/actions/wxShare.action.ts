import { Action } from "@ngrx/store";
import { WxShareState } from "../types/wxShare.model";

export const UPDATE = "[WXSHARE] UPDATE";
export class Update implements Action {
    readonly type = UPDATE;
    constructor(public payload: WxShareState) {
    }

}
export type All =
    Update;