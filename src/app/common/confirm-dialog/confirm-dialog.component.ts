import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IConfirmDialogData } from 'src/app/schema/type';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  /** Handle subscription */
  subs!: Subscription;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IConfirmDialogData) {
  }

  /**
   * on submit event
   * 
   * @param confirmFlag confirmation flag
   */
  onSubmit(confirmFlag: boolean): void {
    this.close(confirmFlag);
  }

  /**
   * close dialog event
   * 
   * @param flag confirmation flag
   * @returns confirmation flag
   */
  close = (flag: boolean): void => this.dialogRef.close(flag);
}
