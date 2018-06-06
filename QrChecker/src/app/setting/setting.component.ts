import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetComponent, ActionSheetService, SkinType, ActionSheetConfig } from 'ngx-weui';

@Component({
  selector: 'app-setting',
  template: `
  <button weui-button weui-type="default" (click)="onShowBySrv('auto', true)">自动形式（且点背景不可关闭）</button>
  `,
  styles: []
})
export class SettingComponent implements OnInit {
  @ViewChild('auto') autoAS: ActionSheetComponent;
  constructor(private srv: ActionSheetService) { }


  menus: any[] = [
    { text: '菜单一', value: 'test', other: 1 },
    { text: '菜单三', value: 'test' }
  ];
  config: ActionSheetConfig = <ActionSheetConfig>{
    title: '这是一段标题'
  };

  ngOnInit() {
  }


  onShowBySrv(type: SkinType, backdrop: boolean = true) {
    this.config.skin = type;
    this.config.backdrop = backdrop;
    this.srv.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.srv.destroyAll();
  }
}
