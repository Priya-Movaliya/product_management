import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { Observable, Subscription, finalize, of, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProductDetails } from 'src/app/schema/type';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridTemplate, defaultColDef, gridOptions } from 'src/app/utilities/utilities';
import { ActionRendererComponent } from 'src/app/common/action-renderer/action-renderer.component';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { ImageViewDialogComponent } from 'src/app/common/image-view-dialog/image-view-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  /** Handle subscription */
  subs!: Subscription;
  /** grid column api */
  gridApi!: GridApi;
  /** default configuration for ag-grid columns */
  defaultColDef: ColDef = defaultColDef;
  /** column defination  */
  columnDefs: ColDef[] = [];
  /** grid options */
  gridOptions: GridOptions = gridOptions;
  /** no rows template */
  noRowsTemplate: string = AgGridTemplate.NOROWSTEMPLATE;
  /** product grid row data */
  rowData: IProductDetails[] = [];

  constructor(private dialog: MatDialog, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.subs = new Subscription();
  }

  ngAfterViewInit(): void {
    this.columnDefs = [
      {
        headerName: 'No.',
        cellRenderer: function (params: { node: { rowIndex: number; } }) {
          return params.node.rowIndex + 1; // Add 1 to start counting from 1 instead of 0
        },
        minWidth: 80,
        maxWidth: 80
      },
      {
        headerName: 'Action',
        suppressSizeToFit: true,
        cellRenderer: ActionRendererComponent,
        cellRendererParams: {
          edit: (data: IProductDetails) => this.openAddEditProductDialog(data),
          delete: (id: string) => this.removeProduct(id)
        },
        minWidth: 120,
        maxWidth: 120
      },
      {
        headerName: 'Product Image',
        suppressSizeToFit: true,
        cellRenderer: ActionRendererComponent,
        cellRendererParams: {
          view: (data: IProductDetails) => this.viewProductImage(data)
        },
        minWidth: 150
      },
      {
        headerName: 'Name',
        field: 'name',
        floatingFilter: true,
        tooltipValueGetter: (params) => !!params?.data?.name ? params.data.name : '',
        minWidth: 280
      },
      {
        headerName: 'Description',
        field: 'description',
        floatingFilter: true,
        tooltipValueGetter: (params) => !!params?.data?.description ? params.data.description : '',
        minWidth: 350
      },
      {
        headerName: 'Price',
        field: 'price',
        floatingFilter: true,
        minWidth: 100
      }
    ];
  }

  /**
   * get product list
   * 
   * @returns product list observable
   */
  getProduct(): Observable<IProductDetails[]> {
    return this.productService.getProductList().pipe(
      tap((data) => this.rowData = data)
    );
  }

  /**
   * view product image
   * 
   * @param data selected product data
   */
  viewProductImage(data: IProductDetails): void {
    this.dialog.open(ImageViewDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'transparent-dialog',
      disableClose: true,
      data: data.image
    });
  }

  /**
   * remove selected product
   * 
   * @param id selected product id
   */
  removeProduct(id: string): void {
    const message = 'Are you sure you want to delete this product ?'
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { message: message }
    });

    confirmDialogRef.afterClosed().pipe(
      switchMap((res) => res ? this.productService.deleteProduct(id).pipe(switchMap(() => this.getProduct())) : of(null))
    ).subscribe();

  }

  /**
   * open product dialog for add/edit operation
   * 
   * @param productData selected product data
   */
  openAddEditProductDialog(productData?: IProductDetails): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { productData, editFlag: productData ? true : false }
    });

    const dialogRefSub = dialogRef.afterClosed().pipe(
      switchMap((res) => res ? this.getProduct() : of(null))
    ).subscribe();
    this.subs.add(dialogRefSub);
  }

  /**
   * on grid ready event
   * 
   * @param params grid param
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.hideOverlay();
    this.subs.add(this.getProduct().subscribe());
  }

  /**
   *  on destroy hook
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
