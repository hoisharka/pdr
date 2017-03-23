import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { EditActionModal } from "../../modals/edit-action-modal/edit-action-modal";
import { Action } from "../../scene/action";
import { Group } from "../../scene/group";
import { TempleteService } from "../../providers/templete.service";

@Component({
  selector: 'page-templete-details',
  templateUrl: 'templete-detail.html'
})
export class TempleteDetailsPage {
  selectedTemplete: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public templeteService: TempleteService) {
    this.selectedTemplete = navParams.get('templete');
    console.log('TempleteDetailsPage')
  }

  addGroup(){
    this.selectedTemplete.groups.push(new Group([]));
    this.templeteService.update(this.selectedTemplete);
  }

  removeGroup(group: Group){
    console.log('removeGroup');
    let result = confirm('그룹을 삭제하시겠습니까?');
    if(result){
      this.selectedTemplete.groups.splice(this.selectedTemplete.groups.indexOf(group), 1);
      this.templeteService.update(this.selectedTemplete);
    }
  }

  showEditActionModal(group: Group, action: Action) {
    let modal = this.modalCtrl.create(EditActionModal, {isTemplete: true, selectedTemplete: this.selectedTemplete, group: group, action: action});
    modal.present();
  }

  removeAction(group: Group, action: Action){
    console.log('removeAction');
    let result = confirm('해당 항목을 삭제하시겠습니까?');
    if(result){
      group.actions.splice(group.actions.indexOf(action), 1);
      this.templeteService.update(this.templeteService);
    }
  }

  updateScene(){
    this.templeteService.update(this.selectedTemplete);
  }

  getDownloadData(){
    let report = [];

    for(let i=0; i<this.selectedTemplete.groups.length; i++){
      for(let j=0; j<this.selectedTemplete.groups[i].actions.length; j++){
        let item = {
          title: this.selectedTemplete.groups[i].actions[j].title,
          time: this.selectedTemplete.groups[i].actions[j].time
        }
        report.push(item);
      }
    }

    return report;
  }
}
