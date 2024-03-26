import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageViewDialogComponent } from './image-view-dialog/image-view-dialog.component';

const materialModule = [
  ReactiveFormsModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  FormsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
    ActionRendererComponent,
    ConfirmDialogComponent,
    ImageViewDialogComponent
  ],
  imports: [
    CommonModule,
    materialModule,

  ],
  exports: [
    materialModule,
  ]
})
export class SharedModule { }
