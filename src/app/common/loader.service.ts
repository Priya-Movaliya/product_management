import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoaderState } from '../schema/type';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject<ILoaderState>({
    show: false
  });
  loaderState = this.loaderSubject.asObservable();

  /**
   *  loader show
   */
  show() {
    this.toggle(true);
  }

  /**
   * loader hide
   */
  hide() {
    this.toggle(false);
  }

  /**
   * toggle for loader hide/show
   * 
   * @param show loader hide/show flag
   */
  private toggle(show: boolean) {
    if (show) {
      this.loaderSubject.next({ show: true });
    } else {
      this.loaderSubject.next({ show: false });
    }
  }
}
