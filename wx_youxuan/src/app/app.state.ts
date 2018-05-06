import { Cache } from "../store/types/cache.model";
import { WxShareState } from "../store/types/wxShare.model";
import { KanJiaState } from "../store/state/kanJia.State";

export interface AppState {
    cache: Cache,
    wxShare: WxShareState,
    kanJiaUser: KanJiaState
}
