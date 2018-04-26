import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { catchError, concat, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { defer } from "rxjs/observable/defer";
import { fromPromise } from 'rxjs/observable/fromPromise';


import * as  UserActions from "../actions/user.action";
import { ShopAddress } from "../../models/shopAddress.model";
import { UserState } from "../states/user.state";
import { UserService } from "../../services/user.service";
import { UiProvider } from "../../providers/ui/ui";



@Injectable()
export class UserEffects {

    constructor(private actions$: Actions,
        private userService: UserService,
        private UI: UiProvider) {
    }

    @Effect() init$ = defer(() => fromPromise(this.userService.getUser())
        .pipe(
            map((res) => new UserActions.LoadSuccess(res)), //next
            catchError((error) => this.createErrorObservableAndLog(error)), //error
        //concat(Observable.of(new UserActions.Init())) //complate
    ));

    @Effect() deleteAddress = this.actions$
        .ofType(UserActions.DELETEADDRESS)
        .switchMap((action: any) => this.userService.deleteAddress(action.payload))
        .map((res: { success: boolean, data: number, msg: string }) => {
            if (res.success) {
                this.UI.HideLoading();
                return new UserActions.DeleteAddressSuccess(res.data)
            }
            else {
                this.createErrorObservableAndLog(res.msg);
            }
        });

    @Effect() addAddress = this.actions$
        .ofType(UserActions.ADDADDRESS)
        .switchMap((action: any) => this.userService.addAddress(action.payload))
        .map((res: { success: boolean, data: ShopAddress }) => {
            this.UI.HideLoading();
            return new UserActions.AddAddressSuccess(res.data)
        });

    @Effect() setAddress = this.actions$
        .ofType(UserActions.SETADDRESS)
        .switchMap((action: any) => this.userService.setAddressDefault(action.payload))
        .map((res: { success: boolean, data: number, msg: string }) => {
            if (res.success) {
                this.UI.HideLoading();
                this.UI.navPop();
                return new UserActions.SetAddressOk(res.data)
            }
            else {
                this.createErrorObservableAndLog(res.msg);
            }
        });

    private createErrorObservableAndLog(error) {
        return Observable.of(new UserActions.LoadError(error));
    }

}