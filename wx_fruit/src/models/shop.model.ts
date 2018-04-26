export interface Shop {
    Id: number;
    StoreType: number;
    /*[StringLength(64)]*/
    StoreName: string;
    /*[StringLength(128)]*/
    Address: string;
    /*[StringLength(32)]*/
    Phone: string;
    /*[StringLength(64)]*/
    AppId: string;
    ShareData: ShareData;
    Notice: string;
    Setting: any
}

export interface ShareData {
    title: string,
    desc: string,
    link: string,
    imgUrl: string
}


export interface ShopItem {
    Id: number;
    Name: string;
    CategoryId: number;
    Tags: string;
    Price: number;
    PriceVip: number;
    Unit: string;
    State: boolean;
    Stock: number;
    LogoUrl: string;
    /*[StringLength(256)]*/
    AppImgShareText: string;
    Desc: string;
    Content: string;
    DayBuyLimit: number;
    Pics: string[];
    Sort: number;
    BarCode: string;
    //以下不在数据库中
    Count: number;
    Comment: string;
}

export interface ShopCategory {
    Id: number;
    Name: string;
    ParentId: number;
    Level: number;
    Sort: number;
    AdList: string[];
    IsAppShow: boolean;
}