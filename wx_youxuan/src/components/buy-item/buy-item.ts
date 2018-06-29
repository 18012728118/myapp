import { Component, Input } from '@angular/core';
import { InitDataProvider } from '../../providers/providers';
import { ModalController, NavController, App } from 'ionic-angular';

@Component({
  selector: 'buy-item',
  templateUrl: 'buy-item.html'
})
export class BuyItemComponent {

  @Input('item') item;
  constructor(
    private initData: InitDataProvider,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private app: App
  ) {
  }

  goDetail(buyitem) {
    let pagename: string = "";
    switch (buyitem.Type) {
      case 1:
        pagename = "ItemDetailPage";
        break;
      case 11:
        pagename = "MuJuanPage";

        break;
      case 3:
        pagename = "KanjiaPage";
        break;
    }
    // let modal = this.modalCtrl.create(pagename, { DetailId: buyitem.Id, Self: true });
    // modal.present();
    this.navCtrl.push(pagename, { DetailId: buyitem.Id, Self: true });
    //this.app.getRootNav().push(pagename, { DetailId: buyitem.Id, Self: true });

  }

  get btnText() {
    if (new Date(this.item.DateTimeStart) > new Date())
      return { text: "暂未开始", color: "primary" }
    if (this.item.Count === 0)
      return { text: "已售完", color: "disable" };
    if (new Date(this.item.DateTimeEnd) < new Date())
      return { text: "已结束", color: "disable" }
    return { text: "立即购买", color: "primary" }
  }

  get showPrice() {
    if (this.item.Type === 11)
      return false;
    return true;
  }
}
