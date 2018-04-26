import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import 'rxjs/add/operator/map';

//redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//owner
import { InitDataProvider } from '../providers/init-data/init-data';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ModalService } from '../services/modalService';
import { Settings } from '../providers/settings/settings';
import { Api } from '../providers/api/api';
import { ComponentsModule } from '../components/components.module';
import { cacheReducer } from '../store/reducers/cache.reduce';
import { wxShareReducer } from '../store/reducers/wxShare.reduce';
import { kanJiaUserReducer } from '../store/reducers/kanJiaUser.reduce';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/antuService';

declare var WeixinJSBridge;
declare var wx: any;
export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
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
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Api,
    AuthService,
    InitDataProvider,
    ModalService
  ]
})
export class AppModule { }
