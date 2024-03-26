import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent {
  zoomLevel = 1;

  constructor(public dialogRef: MatDialogRef<ImageViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageUrl: string) { }

  /**
   * mouse scroll event
   * 
   * @param event mouse scroll event
   */
  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (delta > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
  }

  /**
   *  zoom in for image
   */
  zoomIn(): void {
    if (this.zoomLevel < 3) {
      this.zoomLevel += 0.1;
    }
  }

  /**
   * zoom out for image
   */
  zoomOut(): void {
    if (this.zoomLevel > 0.5) {
      this.zoomLevel -= 0.1;
    }
  }

  /**
   * 
   * close dialog event
   */
  close = (): void => this.dialogRef.close();
}
