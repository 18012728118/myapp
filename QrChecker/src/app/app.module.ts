import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WeUiModule } from 'ngx-weui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './setting/setting.component';
import { TabsComponent } from './tabs/tabs.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'setting', component: SettingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HomeComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    WeUiModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
