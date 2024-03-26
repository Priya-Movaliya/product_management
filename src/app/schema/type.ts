import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ICellRendererParams } from "ag-grid-community";

/**
 *  loader state 
 */
export interface ILoaderState {
  show: boolean;
}

/**
 * navigation data configuration
 */
export interface INavigationItem {
  url: string;
  name: string;
  icon: string;
}

/**
 *  product list
 */
export interface IProductDetails {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

/**
 *  snackbar configuration
 */
export interface ISnackBarConfigurations {
  duration: number;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
  panelClass?: string[]
}

/**
 *  product dialog data
 */
export interface IProductDialogData { productData?: IProductDetails, editFlag: boolean }

/**
 * confirm dialog configuration
 */
export interface IConfirmDialogData { message: string }

/**
 * custom cell renderre params
 */
export interface ICustomCellRendererParams extends ICellRendererParams {
  edit: (data: IProductDetails) => void;
  delete: (id: string) => void;
  view: (data: IProductDetails) => void;
}