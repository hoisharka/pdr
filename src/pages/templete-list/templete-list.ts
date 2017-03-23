import { Component, NgZone } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { Scene } from "../../scene/scene";
import { TempleteService } from "../../providers/templete.service";
import { TempleteDetailsPage } from "../templete_detail/templete-detail";

@Component({
  selector: 'page-templete-list',
  templateUrl: 'templete-list.html'
})
export class TempleteListPage {
  templetes: any[];

  constructor(public templeteService: TempleteService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private zone: NgZone) {
    // If we navigated to this page, we will have an item available as a nav param
    this.templetes = [];
  }

  goDetail(templete){
    console.log('goDetail templete: ', templete);
    this.navCtrl.push(TempleteDetailsPage, {
      templete: templete
    });
  }

  addTemplete(newTitle){
    if(newTitle.value){
      let newScene = new Scene(new Date().toISOString(), newTitle.value, []);

      this.templeteService.add(newScene);

      newTitle.value = '';
      this.goDetail(newScene);
    }else{
      alert('제목을 입력해주세요.');
    }
  }

  removeTemplete(scene: Scene){
    console.log(scene);
    let result = confirm('해당 템플릿을 삭제하시겠습니까?');
    if(result){
      this.templeteService.delete(scene);
    }
  }

  ionViewDidLoad() {
    console.log('----------- ionViewDidLoad');
    this.platform.ready().then(() => {
      this.templeteService.initDB();

      this.templeteService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.templetes = data;
          });
        })
        .catch(console.error.bind(console));
    });
  }
}
