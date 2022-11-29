import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ExtensionMapingModel } from '../models/extensionMaping.model';
import { NodeViewModel } from '../models/nodeView.model';

@Component({
  selector: 'afs-node-view',
  template: `

<mat-tree [dataSource]="dataSource" [treeControl]="treeControl"  class="example-tree">
    <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
        <span class="bold" [style.color]="getExtensionColor(node.name.split('.')[node.name.split('.').length-1])">{{node.name.split('.')[node.name.split('.').length-1]}}&nbsp;&nbsp;</span> {{node.name}}
    </mat-tree-node>
    <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">

          <mat-divider *ngIf="node.isHeader == true" ></mat-divider>
          <div class="mat-tree-node full-width">
            <button mat-icon-button matTreeNodeToggle>
                <mat-icon>{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon>
                <span [class.header]="node?.isHeader">{{node.name}}</span>
            </button>
          </div>
          <div [class.example-tree-invisible]="!treeControl.isExpanded(node)" role="group">
          <ng-container matTreeNodeOutlet></ng-container>
      </div>
</mat-nested-tree-node>
  `
,
styleUrls: ['./styles.css']
})
export class NodeViewComponent {

  treeControl = new NestedTreeControl<NodeViewModel>(node => node.children);

  @Input()
  dataSource:any;

  @Input()
  extMap:any;

  hasChild = (_: number, node: NodeViewModel) => !!node.children && node.children.length > 0;

  getExtensionColor(ext:string):string{

    let color ='';
    this.extMap.forEach((e: any)=> {

      if(e.type.toLocaleLowerCase() == ext.toLocaleLowerCase()){
        color= e.color;
      }
    });
    return color;
  }
}
