import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AppService } from '../app/app.service'


@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  _w: any;
  rootPage: any = TabsPage;
  constructor(private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    appService: AppService,
  ) {
    platform.ready().then(() => {

      console.log(this.platform.platforms());
      statusBar.hide();
      splashScreen.hide();

      if (!appService.isWeixinBrowser()) {
        if (window['plugins']) {
          this.initJpush();
          this.setTags();
          this.setAlias("justfromtestbyTT");
        }
      }
    });
  }

  private initJpush() {
    if (window['plugins'].jPushPlugin) {
      window['plugins'].jPushPlugin.init();
      if (this.isIos()) {
        window['plugins'].jPushPlugin.setDebugModeFromIos();
        window['plugins'].jPushPlugin.setApplicationIconBadgeNumber(0);
      } else {
        window['plugins'].jPushPlugin.setDebugMode(true);
        window['plugins'].jPushPlugin.setStatisticsOpen(true);
      }
      this.jPushAddEventListener();
    }
  }

  public isIos() {
    return this.platform.is('ios')
  }
  public isAndroid() {
    return this.platform.is('android');
  }
  public isMobile() {
    return this.platform.is('ios') || this.platform.is('android');
  }

  private jPushAddEventListener() {
    //判断系统设置中是否允许当前应用推送
    window['plugins'].jPushPlugin.getUserNotificationSettings(result => {
      if (result == 0) {
        console.log('系统设置中已关闭应用推送');
      } else if (result > 0) {
        console.log('系统设置中打开了应用推送');
      }
    });

    //点击通知进入应用程序时会触发的事件
    document.addEventListener("jpush.openNotification", event => {
      let content = this.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.openNotification" + content);
    }, false);

    //收到通知时会触发该事件
    document.addEventListener("jpush.receiveNotification", event => {
      let content = this.isIos() ? event['aps'].alert : event['alert'];
      console.log("jpush.receiveNotification" + content);
    }, false);

    //收到自定义消息时触发这个事件
    document.addEventListener("jpush.receiveMessage", event => {
      let message = this.isIos() ? event['content'] : event['message'];
      console.log("jpush.receiveMessage" + message);
    }, false);


    //设置标签/别名回调函数
    document.addEventListener("jpush.setTagsWithAlias", event => {
      console.log("onTagsWithAlias");
      let result = "result code:" + event['resultCode'] + " ";
      result += "tags:" + event['tags'] + " ";
      result += "alias:" + event['alias'] + " ";
      console.log(result);
    }, false);

  }

  //设置标签
  public setTags() {
    if (!this.isMobile()) {
      return;
    }
    let tags = this.isAndroid() ? ['android'] : ['ios'];
    console.log('设置setTags:' + tags);
    window['plugins'].jPushPlugin.setTags(tags);
  }

  //设置别名,一个用户只有一个别名
  public setAlias(userId) {
    if (!this.isMobile()) {
      return;
    }
    console.log('设置setAlias:' + userId);
    //ios设置setAlias有bug,值必须为string类型,不能是number类型
    window['plugins'].jPushPlugin.setAlias('' + userId);
  }

}
