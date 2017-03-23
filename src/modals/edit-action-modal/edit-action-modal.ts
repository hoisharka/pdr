import { Component, OnInit } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Action } from "../../scene/action";
import { SceneService } from "../../providers/scene.service";
import { TempleteService } from "../../providers/templete.service";
import { DatePipe } from "@angular/common";

@Component({
  templateUrl: 'edit-action-modal.html'
})
export class EditActionModal implements OnInit {

  action:Action = null;
  isTemplete: boolean;
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              public sceneService: SceneService,
              public templeteService: TempleteService,
              public datePipe: DatePipe) {

    this.isTemplete = params.data.isTemplete;

    if(this.params.data.action){
      this.action = this.params.data.action;
      if(!this.isTemplete && this.action.time === '0'){
        this.action.time = this.datePipe.transform(new Date(), 'HH:mm');
      }
    }else{
      let time: string;
      if(this.isTemplete){
        time = '0';
      }else{
        /*let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let hours_str: string = (hours < 10 ? '0':'') + hours.toString();
        let minutes_str: string = (minutes < 10 ? '0':'') + minutes.toString();
        time = hours_str + ':' + minutes_str;*/
        time = this.datePipe.transform(new Date(), 'HH:mm');
      }

      this.action = new Action('', time);
    }
  }

  ngOnInit(): void{

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveAction(){
    if(this.isTemplete){
      if(!this.params.data.action){
        this.params.data.group.actions.push(this.action);
      }
      this.templeteService.update(this.params.data.selectedTemplete);
    }else{
      if(!this.params.data.action){
        this.params.data.group.actions.push(this.action);
      }
      this.sceneService.update(this.params.data.selectedItem);
    }
    this.dismiss();
  }
}
