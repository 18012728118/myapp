import { Cache } from "../store/types/cache.model";
import { WxShareModel } from "../store/types/wxShare.model";
import { KanJiaUser } from "../store/types/kanJiaUser.Model";

export interface AppState {
    cache: Cache,
    wxShare: WxShareModel,
    kanJiaUser: KanJiaUser
}
