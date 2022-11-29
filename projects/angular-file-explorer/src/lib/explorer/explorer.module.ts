import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { ExplorerComponent } from './components/explorer.component';
import { NodeViewComponent } from './components/nodeView.component';
import { ExplorerService } from './services/explorer.service';


@NgModule({
  declarations: [
    ExplorerComponent, NodeViewComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTreeModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [ExplorerService],
  exports: [ExplorerComponent]
})
export class ExplorerModule { }
