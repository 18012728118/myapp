import { Action } from "@ngrx/store";
import { WxShareModel } from "../types/wxShare.model";

export const UPDATE = "[WXSHARE] UPDATE";
export class Update implements Action {
    readonly type = UPDATE;
    constructor(public payload: WxShareModel) {
    }

}
export type All =
    Update;