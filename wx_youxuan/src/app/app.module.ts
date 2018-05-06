import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
//redux
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//reducer
import { cacheReducer } from '../store/reducers/cache.reduce';
import { wxShareReducer } from '../store/reducers/wxShare.reduce';
import { kanJiaUserReducer } from '../store/reducers/kanJiaUser.reduce';

//effects
import { CacheEffects } from '../store/effects/cache.effect';

//owner
import { MyApp } from './app.component';
import { Settings } from '../providers/settings/settings';
import { ComponentsModule } from '../components/components.module';

import { Api } from '../providers/api/api';
import { AuthService } from '../services/anthService';
import { AppService } from '../services/appService';
import { ModalService } from '../services/modalService';

import { InitDataProvider } from '../providers/init-data/init-data';
import { ENV } from "@app/env";

declare var WeixinJSBridge;
declare var wx: any;

export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({
      cache: cacheReducer,
      wxShare: wxShareReducer,
      kanJiaUser: kanJiaUserReducer
    }),
    ENV.isDebugMode ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    EffectsModule.forRoot([CacheEffects])

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Api,
    AuthService,
    InitDataProvider,
    ModalService,
    AppService
  ]
})
export class AppModule { }
