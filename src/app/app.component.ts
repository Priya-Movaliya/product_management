import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavigationService } from './services/side-navigation.service';
import { onMainContentChange } from './animation/animation';
import { Subscription } from 'rxjs';
import { LoaderService } from './common/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'product-demo';
  /** is loading progress bar flag */
  isLoading: boolean = true;
  /** subscription handler */
  subs: Subscription = new Subscription();
  /** side navigation change flag */
  public onSideNavChange: boolean = true;

  constructor(private _sidenavService: SideNavigationService, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    const sideNavSub = this._sidenavService.sideNavState$.subscribe(res => this.onSideNavChange = res);
    this.subs.add(sideNavSub);

    const loaderSub = this.loaderService.loaderState.subscribe(res => this.isLoading = res.show)
    this.subs.add(loaderSub);
  }

  /**
   * on destroy hook
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
