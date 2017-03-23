import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { EditActionModal } from "../modals/edit-action-modal/edit-action-modal";
import { SceneService } from "../providers/scene.service";
import { FileService } from "../providers/file-provider";
import { DatePipe } from "@angular/common";
import { TempleteService } from "../providers/templete.service";
import { TempleteDetailsPage } from "../pages/templete_detail/templete-detail";
import { TempleteListPage } from "../pages/templete-list/templete-list";

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TempleteDetailsPage,
    TempleteListPage,
    EditActionModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TempleteDetailsPage,
    TempleteListPage,
    EditActionModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SceneService, TempleteService, FileService, DatePipe]
})
export class AppModule {}
