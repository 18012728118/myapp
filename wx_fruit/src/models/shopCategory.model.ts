export interface ShopCategory {
    Id: number;
    Name: string;
    ParentId: number;
    Level: number;
    Sort: number;
    DateTimeCreate: string;
    StoreId: number;
    AdList: Array<any>
}
