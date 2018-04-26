
import * as UserActions from "../actions/user.action";
import { UserState } from "../states/user.state";

export type Action = UserActions.Actions;

export function userReducer(state: UserState = null, action: Action) {
    switch (action.type) {
        case UserActions.LOADSUCCESS:
            let data = action.payload.data;
            return Object.assign({}, state, {
                shopMember: data.shopMember,
                wxUserInfo: data.wxUser,
                addressList: data.addressList
            });

        case UserActions.DELETEADDRESSSUCCESS:
            state.addressList = state.addressList.filter(a => a.Id !== action.payload);
            return state;

        case UserActions.ADDADDRESSSUCCESS:
            return Object.assign({}, state, { "addressList": [...state.addressList, action.payload] });

        case UserActions.SETADDRESSOK:
            let add = state.addressList.map(a => {
                if (a.Id === action.payload)
                    a.IsDefault = true;
                else
                    a.IsDefault = false;
                return a;
            });
            console.log(add)
            return Object.assign({}, state, {
                "addressList":
                    [...add]
            });
        case UserActions.LOADERROR:
            return state;
        default:
            return state;
    }
}