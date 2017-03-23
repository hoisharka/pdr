import { Injectable } from "@angular/core";
import { File } from 'ionic-native';

declare let cordova: any;
@Injectable()
export class FileService{
  writeFile(fileName, text){
    let download_path = cordova.file.externalRootDirectory + 'Download/';
    console.log('writeFile download path: ' + download_path);
    File.writeFile(download_path, fileName, text).then(

      (fileEntry) => {
        alert('download complete at ' + fileEntry.fullPath);
      }
    ).catch(
      (err) => {
        // do something
        console.log(err.message);
      }
    );
  }
}

