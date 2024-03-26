import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ImageViewDialogComponent } from 'src/app/common/image-view-dialog/image-view-dialog.component';
import { SnackbarService } from 'src/app/common/snackbar.service';
import { IProductDialogData } from 'src/app/schema/type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit, OnDestroy {
  /** Handle subscription */
  subs!: Subscription;
  /** product form group */
  productForm!: FormGroup;
  /** uploaded product image base64 */
  uploadedImage?: string;

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IProductDialogData, private fb: FormBuilder,
    private productService: ProductService, private snackBarService: SnackbarService,
    private dialog: MatDialog) {

    this.createForm(dialogData);
  }

  ngOnInit(): void {
    this.subs = new Subscription();
  }

  /**
   * product from initialization
   * 
   * @param dialogData product dialog data
   */
  createForm(dialogData?: IProductDialogData): void {
    this.uploadedImage = dialogData?.productData?.image;
    this.productForm = this.fb.group({
      name: [dialogData?.productData?.name || null, [Validators.required, Validators.maxLength(100)]],
      description: [dialogData?.productData?.description || null],
      price: [dialogData?.productData?.price || null, [Validators.required, Validators.min(0), Validators.max(Number.MAX_SAFE_INTEGER)]],
      image: [dialogData?.productData?.image || null]
    })
  }

  /**
   * on file select event
   * 
   * @param event file event
   */
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      // Validate file size and format
      if (this.validateFileSize(file) && this.validateImageFormat(file)) {
        this.readAndDisplayImage(file);
      } else {
        const errorMessage = 'Invalid file. Please upload an image file (max 2 MB).'
        this.snackBarService.showMessage(errorMessage, 'errorSnack')
      }
    }
  }

  /**
   * validate file size
   * 
   * @param file c
   * @returns flag for valid file size
   */
  validateFileSize(file: File): boolean {
    const maxSize = 2 * 1024 * 1024; // 2 MB
    return file.size <= maxSize;
  }

  /**
   * validate image format
   * 
   * @param file selected image file
   * @returns flag for valid image format
   */
  validateImageFormat(file: File): boolean {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedFormats.includes(file.type);
  }

  /**
   * store file data to display
   * 
   * @param file selected image file
   */
  readAndDisplayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  /**
   *  product submit
   */
  onProductSubmit(): void {
    if (this.productForm?.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      const productData = {
        ...this.productForm.value,
        image: this.uploadedImage
      }

      if (this.dialogData?.productData?.id) {
        this.productService.updateProduct(this.dialogData?.productData?.id, productData).subscribe(() => this.close(true));
      } else {
        this.productService.addProduct(productData).subscribe(() => this.close(true));
      }
    }
  }

  /**
   * get product form group control
   * 
   * @param controlName product from group control name
   * @returns form control
   */
  getFormControl(controlName: string): AbstractControl | null {
    return this.productForm.get(controlName);
  }

  /**
   *  preview selected image
   */
  previewImage(): void {
    this.dialog.open(ImageViewDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'transparent-dialog',
      disableClose: true,
      data: this.uploadedImage
    });
  }

  /**
   *  on destroy hook
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  close = (flag: boolean): void => this.dialogRef.close(flag);

}
