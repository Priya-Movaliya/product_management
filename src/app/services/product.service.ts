import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductDetails } from '../schema/type';
import { SnackbarService } from '../common/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /** product api url */
  productUrl = environment.apiUrl + '/products';

  constructor(private _http: HttpClient, private _snackBarService: SnackbarService) { }

  /**
   * add product data
   * 
   * @param productData request product data
   * @returns added product observable
   */
  addProduct(productData: IProductDetails): Observable<IProductDetails> {
    return this._http.post<IProductDetails>(`${this.productUrl}`, productData).pipe(
      tap((res) => {
        this._snackBarService.showMessage('Product created successfully', 'successSnack');
      }),
      catchError(err => throwError(err))
    ) as Observable<IProductDetails>;
  }

  /**
   * get product list
   * 
   * @returns product list observable
   */
  getProductList(): Observable<IProductDetails[]> {
    return this._http.get<IProductDetails[]>(`${this.productUrl}`) as Observable<IProductDetails[]>;
  }

  /**
   * update product data
   * 
   * @param id selected id of product
   * @param updatedProductData updated product data
   * @returns updated product observable
   */
  updateProduct(id: string, updatedProductData: IProductDetails): Observable<IProductDetails> {
    return this._http.put<IProductDetails>(`${this.productUrl}/${id}`, updatedProductData).pipe(
      tap((res) => {
        this._snackBarService.showMessage('Product updated successfully', 'successSnack');
      }),
      catchError(err => throwError(err))
    ) as Observable<IProductDetails>;
  }

  /**
   * delete product data
   * 
   * @param id selected product id
   * @returns deleted product observable
   */
  deleteProduct(id: string): Observable<void> {
    return this._http.delete<void>(`${this.productUrl}/${id}`).pipe(
      tap((res) => {
        this._snackBarService.showMessage('Product deleted successfully', 'successSnack');
      }),
      catchError(err => throwError(err))
    ) as Observable<void>;
  }

}
