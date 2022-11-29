import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ExtensionMapingModel } from '../models/extensionMaping.model';
import { FileModel } from '../models/file.model';
import { NodeViewModel } from '../models/nodeView.model';
import { ExplorerService } from '../services/explorer.service';



@Component({
  selector: 'afs-explorer',
  template: `

    <input
      type="file"
      #fileInput
      (change)="uploadFiles(fileInput.files)"
      webkitdirectory
      multiple
    />
    <afs-node-view [extMap]="EXT_MAP" [dataSource]="dataSource"></afs-node-view>
  `
})
export class ExplorerComponent {



  EXT_MAP = [
    new ExtensionMapingModel("xml","blue"),
    new ExtensionMapingModel("java","red")
  ];

  dataSource = new MatTreeNestedDataSource<NodeViewModel>();
  nodesData: NodeViewModel|null = null;

  constructor(public service: ExplorerService) {

  }


  async uploadFiles(files: any) {
    
    for(let file of Array.from(files)){

      const path: string = (file as any)['webkitRelativePath'];
      const name:string = (file as any)['name'];
      const type:string = (file as any)['type'];
      
      const pathPieces = path.split('/');
      pathPieces.pop();
      
      let dir:FileModel = this.service.createFolder(pathPieces);
      dir.children?.push(new FileModel(name,type));

    }

    let file:any = this.service.fileModel;
    this.nodesData = this.createNodeViewModel(this.nodesData,file);
    this.nodesData.isHeader=true;
    this.dataSource.data = [this.nodesData];
  }

  createNodeViewModel(node: NodeViewModel|null, file: FileModel): NodeViewModel{

    if(node == null){
      node = new NodeViewModel(file.name,false,[]);
      file.children?.forEach(c=>{
        node?.children?.push(this.createNodeViewModel(null,c));
      })
    }
    return node;
  }
}
