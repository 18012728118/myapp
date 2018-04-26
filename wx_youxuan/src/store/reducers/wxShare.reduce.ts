import * as wxShareAction from "../actions/wxShare.action";
import { WxShareModel } from "../types/wxShare.model";

export type Action = wxShareAction.All;

export function wxShareReducer(state: WxShareModel = null, action: Action) {
    switch (action.type) {
        case wxShareAction.UPDATE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}