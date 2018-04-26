
import { Action } from "@ngrx/store";
import { CacheState } from "../states/cache.state";
import { ShareData } from "../../models/shop.model";



export const SETSHAREDATA = '[Cache] 设置分享内容';
export class SetShareData implements Action {
    readonly type = SETSHAREDATA;
    constructor(public payload: ShareData) { }
}

export const SETSHAREDATADEFAULT = '[Cache] 设置分享内容为默认';
export class SetShareDataDefault implements Action {
    readonly type = SETSHAREDATADEFAULT;
}
export type Actions = SetShareData;