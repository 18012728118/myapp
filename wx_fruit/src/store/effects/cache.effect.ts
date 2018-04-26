import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { defer } from "rxjs/observable/defer";
import { fromPromise } from 'rxjs/observable/fromPromise';

import { catchError, concat, map } from "rxjs/operators";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';

import * as  CacheAction from "../actions/cache.action";
import { UiProvider } from "../../providers/ui/ui";
import { AppService } from "../../app/app.service";
import { ShopItem } from "models/shop.model";
import { AppState } from "../../app/app.state";
import { Action, Store } from "@ngrx/store";
import { CacheState } from "../states/cache.state";

@Injectable()
export class CacheEffects {
    constructor(private actions$: Actions,
        private store$: Store<AppState>,
        private appService: AppService,
        private UI: UiProvider) {
    }

    private doInit(res) {
        if (res.success) {
            let c: ShopItem[] = JSON.parse(localStorage.getItem("cacheCarts"))
            if (res.data.itemList && c && c.length > 0) {
                c.forEach(e => {
                    //console.log(e.Id);
                    res.data.itemList.forEach(d => {
                        if (d.Id == e.Id) {
                            d.Count = e.Count;
                        }
                    });
                });
                if (res.data.shop.ShareData)
                    this.appService.defaultShareData = res.data.shop.ShareData;
            }
            return new CacheAction.LoadSuccess(res.data)
        }
        else {
            this.UI.showToast(res.msg);
            return new CacheAction.LoadError(res.msg)
        }
    }

    @Effect()
    init$ = defer(() => fromPromise(this.appService.getShopInit())
        .pipe(
            map((res: { success: boolean, data: CacheState, msg: any }) => {
                return this.doInit(res);
            }), //next
            catchError((error) => this.createErrorObservableAndLog(error)), //error
            concat(Observable.of(new CacheAction.Init())) //complate
        ));

    @Effect() reload$: Observable<Action> = this.actions$
        .ofType(CacheAction.RELOAD)
        .mergeMap((action: any) => this.appService.getShopInit()).pipe(
            map((res: { success: boolean, data: CacheState, msg: any }) => {
                return this.doInit(res);
            }), //next
            catchError((error) => this.createErrorObservableAndLog(error))
        );

    @Effect()
    reset$: Observable<Action> = this.actions$
        .ofType(CacheAction.RESET)
        .map(() => {
            return new CacheAction.ResetSuccessAction();
        });

    @Effect() toPay$: Observable<Action> = this.actions$
        .ofType(CacheAction.TOPAY)
        .withLatestFrom(this.store$.select(z => z.cache))
        .map(([action, cacheState]) => {
            if (!cacheState.payType) {
                this.UI.showToast("未选择付款方式");
                return new CacheAction.LoadError("未选择付款方式")
            }
            if (!(cacheState.selectAddress && cacheState.selectAddress.Id)) {
                this.UI.showToast("请选择收款地址");
                return new CacheAction.LoadError("请选择收款地址")
            }
            if (cacheState.shop.Setting && cacheState.shop.Setting.MinOutPrice && cacheState.selectAddress.Id > 0)
                if (cacheState.totalPrice < cacheState.shop.Setting.MinOutPrice) {
                    this.UI.showToast("外送订单最低金额" + cacheState.shop.Setting.MinOutPrice);
                    return new CacheAction.LoadError("外送订单最低金额" + cacheState.shop.Setting.MinOutPrice)
                }
            return new CacheAction.PayReady(cacheState)
        });

    @Effect() payReady$: Observable<Action> = this.actions$
        .ofType(CacheAction.PAYPREREADY)
        .switchMap((action: any) => this.appService.toPay(action.payload)).pipe(
            map((res: any) => {
                if (!res) {
                    this.UI.showToast("SOMEERROR");
                    return new CacheAction.LoadError("SOMEERROR")
                }

                if (res.success) {
                    this.UI.alertPaySuccess();
                    return new CacheAction.PaySuccess();
                }
                else {
                    this.UI.showToast(res.msg);
                    return new CacheAction.LoadError(res.msg)
                }
            }),
            catchError((error) => this.createErrorObservableAndLog(error))
        );

    private createErrorObservableAndLog(error) {
        this.UI.showToast(error);
        return Observable.of(new CacheAction.LoadError(error));
    }
}