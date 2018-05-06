import { WxShareState } from "../store/types/wxShare.model";
import { KanJiaState } from "../store/state/kanJia.State";
import { CacheState } from "../store/state/cache.State";

export interface AppState {
    cache: CacheState,
    wxShare: WxShareState,
    kanJiaUser: KanJiaState
}
