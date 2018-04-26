import { WxUserInfo } from "../../models/wxUserInfo.model";
import { ShopMember } from "../../models/shopMember.model";
import { ShopAddress } from "../../models/shopAddress.model";

export interface UserState {
     wxUserInfo: WxUserInfo,
     shopMember: ShopMember,
     addressList: ShopAddress[]
}