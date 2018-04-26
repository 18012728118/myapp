import { ShareData } from "../../models/shop.model";

import * as WxShareActions from "../actions/wxShare.action";
import { WxShareState } from "../states/wxShare.state";

const initalsharedata: WxShareState = {
    shareData: { title: "", desc: "", link: "", imgUrl: "" }
}

export type Action = WxShareActions.Actions;
export function wxShareReducer(state: WxShareState = initalsharedata, action: Action) {
    switch (action.type) {
        case WxShareActions.SETSHAREDATA:
            return Object.assign({}, state, { shareData: action.payload });
        default:
            return state;
    }
}