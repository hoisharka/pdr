import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Angular2Csv } from "angular2-csv";

import { FileService } from "../../providers/file-provider";
import { EditActionModal } from "../../modals/edit-action-modal/edit-action-modal";
import { Action } from "../../scene/action";
import { Group } from "../../scene/group";
import { SceneService } from "../../providers/scene.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public sceneService: SceneService,
              public fileService: FileService,
              public plt: Platform,
              public datePipe: DatePipe) {
    this.selectedItem = navParams.get('item');
  }

  addGroup(){
    this.selectedItem.groups.push(new Group([]));
    this.sceneService.update(this.selectedItem);
  }

  removeGroup(group: Group){
    console.log('removeGroup');
    let result = confirm('그룹을 삭제하시겠습니까?');
    if(result){
      this.selectedItem.groups.splice(this.selectedItem.groups.indexOf(group), 1);
      this.sceneService.update(this.selectedItem);
    }
  }

  showEditActionModal(group: Group, action: Action) {
    let modal = this.modalCtrl.create(EditActionModal, {selectedItem: this.selectedItem, group: group, action: action});
    modal.present();
  }

  removeAction(group: Group, action: Action){
    console.log('removeAction');
    let result = confirm('해당 항목을 삭제하시겠습니까?');
    if(result){
      group.actions.splice(group.actions.indexOf(action), 1);
      this.sceneService.update(this.selectedItem);
    }
  }

  updateScene(){
    this.sceneService.update(this.selectedItem);
  }

  getDownloadData(){
    let report = [];

    for(let i=0; i<this.selectedItem.groups.length; i++){
      for(let j=0; j<this.selectedItem.groups[i].actions.length; j++){
        let item = {
          title: this.selectedItem.groups[i].actions[j].title,
          time: this.selectedItem.groups[i].actions[j].time
        }
        report.push(item);
      }
    }

    return report;
  }

  exportCSV(){
    let report = this.getDownloadData();
    let fileName = 'report_' + this.getDateStr();
    if(this.plt.is('cordova')){
      let cvs = this.convertToCSV(report);
      let blob = new Blob([cvs], { "type": "text/csv;charset=utf8;" });

      this.fileService.writeFile(fileName + '.csv', blob);
    }
    else{
      new Angular2Csv(report, fileName);
    }
  }

  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }

    return str;
  }

  getDateStr(){
    return this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
  }
}
