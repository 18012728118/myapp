import * as kanJiaUserActions from "../actions/kanJiaUser.action";
import { KanJiaUser } from "../types/kanJiaUser.Model";


export type Action = kanJiaUserActions.All

export function kanJiaUserReducer(state: KanJiaUser = null, action: Action) {
    switch (action.type) {
        case kanJiaUserActions.UPDATE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}