import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarConfigurations } from '../schema/type';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  /** snack bar configurations */
  private snackBarConfig: ISnackBarConfigurations = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  }

  constructor(private snackBar: MatSnackBar) { }

  /**
   * show snackbar message
   * 
   * @param message snackbar message
   * @param messageClass snackbar class
   */
  showMessage(message: string, messageClass: string) {
    this.snackBarConfig['panelClass'] = [messageClass];
    this.snackBar.open(message, 'X', this.snackBarConfig);
  }
}