export interface KanJiaUser {
    Id: number,
    StoreId: number,
    DateTimeCreate: Date,

    BuyItemId: number,
    HelpPersonNum: number,
    NowPrice: number,

    KanJiaLogs: KanJiaLogs[],

    openid: string
    nickname: number,
    headimgurl: number,
}

export interface KanJiaLogs {
    Id: number,
    StoreId: number,
    DateTimeCreate: Date,

    KanJiaUserId: number,
    ReducePrice: number,

    openid: string
    nickname: number,
    headimgurl: number,
}
