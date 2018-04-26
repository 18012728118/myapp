import * as  CacheActions from '../actions/cache.action';
import { CacheState } from 'store/states/cache.state';

export type Action = CacheActions.Actions;

const initalCart = {

    shop: {
        Id: 0, StoreType: 0, StoreName: "", Address: "", Phone: "", AppId: "", ShareData: { title: "", desc: "", link: "", imgUrl: "" },
        Notice: "", Setting: null
    },
    itemList: [],
    categoryList: [],
    error: "",

    total: 0,
    totalPrice: 0,
    totalVipPrice: 0,
    cartItems: [],
    selectAddress: {},
    payType: "",
    comment: "",
}

const emptyCart = {
    total: 0,
    cartItems: [],
    totalPrice: 0,
    totalVipPrice: 0,
    comment: "",
    payType: ""
}


export function cacheReducer(state: CacheState = initalCart, action: Action) {
    switch (action.type) {
        case CacheActions.INITSUCCESS:
            let data = action.payload;
            return Object.assign({}, state, {
                shop: data.shop,
                itemList: data.itemList,
                categoryList: data.categoryList
            });
        case CacheActions.LOADERROR:
            console.error(action.payload)
            return Object.assign({}, state, {
                error: action.payload
            });
        case CacheActions.INIT:
            return Object.assign({}, state, {
                itemList: state.itemList.map(i => {
                    if (!i.Count)
                        i.Count = 0;
                    return i;
                }),
                cartItems: state.itemList.filter(z => z.Count > 0),
                total: state.itemList.filter(z => z.Count > 0).reduce((c, n) => c + n.Count, 0),
                totalPrice: state.itemList.filter(z => z.Count > 0).reduce((c, n) => c + (n.Price * n.Count), 0),
                totalVipPrice: state.itemList.filter(z => z.Count > 0).reduce((c, n) => c + (n.PriceVip * n.Count), 0)
            })
        case CacheActions.ADDTOCART:
            state.cartItems = state.itemList.filter(z => z.Count > 0);
            localStorage.setItem("cacheCarts", JSON.stringify(state.cartItems));
            return Object.assign({}, state, {
                cartItems: state.cartItems,
                total: state.cartItems.reduce((c, n) => c + n.Count, 0),
                totalPrice: state.cartItems.reduce((c, n) => c + (n.Price * n.Count), 0),
                totalVipPrice: state.cartItems.reduce((c, n) => c + (n.PriceVip * n.Count), 0),
            });
        case CacheActions.REMOVECART:
            state.cartItems = state.itemList.filter(z => z.Count > 0);
            localStorage.setItem("cacheCarts", JSON.stringify(state.cartItems));
            return Object.assign({}, state, {
                cartItems: state.cartItems,
                total: state.cartItems.reduce((c, n) => c + n.Count, 0),
                totalPrice: state.cartItems.reduce((c, n) => c + (n.Price * n.Count), 0),
                totalVipPrice: state.cartItems.reduce((c, n) => c + (n.PriceVip * n.Count), 0),
            });

        case CacheActions.RESET_SUCCESS:
            localStorage.removeItem("cacheCarts")
            state.itemList = state.itemList.map(z => { z.Count = 0; return z; })
            return Object.assign({}, state, emptyCart)

        case CacheActions.PAYSUCCESS:
            localStorage.removeItem("cacheCarts")
            state.itemList = state.itemList.map(z => { z.Count = 0; return z; })
            return Object.assign({}, state, emptyCart)


        case CacheActions.SELECTADDRESS:
            return Object.assign({}, state, { selectAddress: action.payload });

        case CacheActions.SETPAYTYPE:
            return Object.assign({}, state, { payType: action.payload });
        case CacheActions.CLEARADDRESSANDPAYTYPE:
            return Object.assign({}, state, {
                payType: "",
                selectAddress: {}
            })
        case CacheActions.SETCOMMNET:
            return Object.assign({}, state, {
                comment: action.payload,
            })

        default:
            return state;
    }

}