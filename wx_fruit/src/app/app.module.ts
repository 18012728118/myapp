import { BrowserModule, } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Content } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//pages
import { MyApp } from './app.component';
import { CartPage } from '../pages/cart/cart';

//http劫持
import { AuthInterceptor } from './auth.interceptor';

//provider
import { AppService } from './app.service'
import { HttpService } from '../providers/HttpService'
import { ApiProvider } from '../providers/api/api';
import { UiProvider } from '../providers/ui/ui';
import { AuthService } from '../services/auth.service';
//pipe
import { PipesModule } from '../pipes/pipes.module'

//redux
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState } from './app.state';

//effect
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from "../store/effects/user.effect"
import { CacheEffects } from '../store/effects/cache.effect';

//reducers
import { userReducer } from '../store/reduces/user.reducer';
import { cacheReducer } from '../store/reduces/cache.reducer';
import * as $ from 'jquery';
import { UserService } from '../services/user.service';

import { ENV } from "@app/env";
import { ComponentsModule } from '../components/components.module';
import { ModalService } from '../services/modal.service';
import { wxShareReducer } from '../store/reduces/wxShare.reducer';




const reducers: ActionReducerMap<AppState> = {
  cache: cacheReducer,
  user: userReducer,
  wxShare: wxShareReducer
}

@NgModule({
  declarations: [
    MyApp,
    CartPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    ENV.isDebugMode ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    ComponentsModule,
    EffectsModule.forRoot([CacheEffects, UserEffects])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
  ],
  providers: [
    Content,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AppService,
    HttpService,
    ApiProvider,
    UiProvider,
    AuthService,
    UserService,
    ModalService
  ]
})
export class AppModule {
}
