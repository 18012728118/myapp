export interface WxUserInfo {
    openid: string;
    nickname: string;
    sex: number;
    language: string;
    city: string;
    province: string;
    country: string;
    headimgurl: string;
    privilege: any;
    unionid: string;
    ShopMember: any;
}

export const InitalWxUserInfo: WxUserInfo =
    { headimgurl: "", openid: "", nickname: "", sex: 0, language: "", city: "", country: "", province: "", privilege: "", unionid: "", ShopMember: null };