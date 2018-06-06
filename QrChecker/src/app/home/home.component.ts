import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent, ToastService } from 'ngx-weui';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isFulfilled } from 'q';

declare var wx: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  step = 1;
  @ViewChild('success') successToast: ToastComponent;
  code: any;
  c = window['state'];
  constructor(public srv: ToastService,
    private http: HttpClient) {
    this.step = 1;
  }

  ngOnInit() {
    this.http.post('http://m.wjhaomama.com/V1/CheckCode', { c: this.c }).subscribe((res: any) => {
      this.code = res;
    });
  }

  toCheck() {
    this.http.post('http://m.wjhaomama.com/V1/UseCode', { c: this.c }).subscribe((res: any) => {
      this.step = 2;
      this.code = res;
    });
  }


  close() {
    wx.closeWindow();
  }

}
