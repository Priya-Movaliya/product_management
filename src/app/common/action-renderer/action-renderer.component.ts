import { Component } from '@angular/core';
import { ICustomCellRendererParams } from 'src/app/schema/type';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss']
})
export class ActionRendererComponent {
  /* params */
  agParams!: ICustomCellRendererParams;

  /**
   * ag init
   * 
   * @param params cell rendere param
   */
  agInit(params: ICustomCellRendererParams): void {
    this.agParams = params;
  }

  /**
   * edit click
   */
  editClicked = () => this.agParams.edit(this.agParams.data);

  /**
   * 
   * delete click
   */
  deleteClicked = () => this.agParams.delete(this.agParams.data.id);

  /**
   * 
   * view click 
   */
  viewClicked = () => this.agParams.view(this.agParams.data);

}
