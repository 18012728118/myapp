import { UserState } from "../store/states/user.state";
import { CacheState } from "../store/states/cache.state";
import { WxShareState } from "store/states/wxShare.state";



export interface AppState {
    readonly cache: CacheState,
    readonly user: UserState,
    readonly wxShare: WxShareState
}
