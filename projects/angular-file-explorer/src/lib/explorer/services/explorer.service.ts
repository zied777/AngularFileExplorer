import { Injectable } from "@angular/core";
import { FileModel } from "../models/file.model";

@Injectable()
export class ExplorerService{


  fileModel : FileModel | undefined;


  createFolder(path: string[]): FileModel{
    if(this.fileModel == undefined){
      this.fileModel = new FileModel(path[0],'',[]);
    }
    let parent:any = this.fileModel;

    for(let i=1; i< path.length; i++){
       let dir = path[i];
       let dirModel = [];
       if(parent.children.length > 0){

          dirModel = parent.children.filter((d: FileModel)=> d.name == dir);
          
       }
      if(dirModel.length == 0){
        dirModel[0] = new FileModel(dir,'',[]);
        parent.children.push(dirModel[0]);
      }
       parent = dirModel[0];

    }
    return parent;
  }

}