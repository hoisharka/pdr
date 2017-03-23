import {Component, NgZone} from '@angular/core';

import {NavController, NavParams, Platform} from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Scene } from "../../scene/scene";
import { SceneService } from "../../providers/scene.service";
import {TempleteService} from "../../providers/templete.service";
import {Group} from "../../scene/group";
import {Action} from "../../scene/action";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  templetes: Array<Scene>;
  selectedTempleteIndex: number;
  items: Array<Scene>;

  constructor(public sceneService: SceneService,
              public templeteService: TempleteService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private zone: NgZone) {

    this.items = [];
    this.templetes = [];
    this.selectedTempleteIndex = -1;
  }

  itemTapped(item){
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  addScene(newTitle){
    if(newTitle.value){
      let newScene = new Scene(new Date().toISOString(), newTitle.value, []);

      console.log('addScene selectedTempleteIndex: ' + this.selectedTempleteIndex);
      if(this.selectedTempleteIndex >= 0){
        let templete = this.templetes[this.selectedTempleteIndex];
        for(let i=0; i<templete.groups.length; i++){
          let group = new Group([]);
          for(let j=0; j<templete.groups[i].actions.length; j++){
            let temp_action = templete.groups[i].actions[j];
            let action = new Action(temp_action.title, temp_action.time);
            group.actions.push(action);
          }
          newScene.groups.push(group);
        }
      }

      this.sceneService.add(newScene);

      newTitle.value = '';
      this.itemTapped(newScene);
    }else{
      alert('제목을 입력해주세요.');
    }
  }

  removeScene(scene: Scene){
    console.log(scene);
    let result = confirm('해당 씬을 삭제하시겠습니까?');
    if(result){
      this.sceneService.delete(scene);
    }
  }

  ionViewDidLoad() {
    console.log('----------- ionViewDidLoad');
    this.platform.ready().then(() => {
      this.sceneService.initDB();

      this.sceneService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.items = data;
          });
        })
        .catch(console.error.bind(console));

      this.templeteService.initDB();

      this.templeteService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.templetes = data;
            console.log('templetes: ', this.templetes)
          });
        })
        .catch(console.error.bind(console));
    });
  }
}
