import { Component, ViewChild } from '@angular/core';
import { ToastComponent, ToastService } from 'ngx-weui';
import { HttpClient } from '@angular/common/http';

declare var wx: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  w: any = window;
  @ViewChild('success') successToast: ToastComponent;
  title = 'app';
  constructor(public srv: ToastService, public http: HttpClient) {
    this.jssdk();
  }

  public jssdk() {
    const _url = encodeURIComponent(location.href.split('#')[0]);
    this.http.get(`http://m.wjhaomama.com/V1/jssdk?url=${_url}`).subscribe((res: any) => {
      wx.config({
        debug: false,
        appId: res.AppId,
        timestamp: res.Timestamp,
        nonceStr: res.NonceStr,
        signature: res.Signature,
        jsApiList: [
          'closeWindow'
        ]
      });
    });
  }

}
