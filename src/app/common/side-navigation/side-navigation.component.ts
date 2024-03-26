import { Component } from '@angular/core';
import { animateText, onSideNavChange } from 'src/app/animation/animation';
import { INavigationItem } from 'src/app/schema/type';
import { SideNavigationService } from 'src/app/services/side-navigation.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideNavigationComponent {
  /** side navigation panel flag */
  sideNavState: boolean = true;
  /** side navigation text flag */
  linkText: boolean = true;
  /** side navigation menu list */
  navigationMenu: INavigationItem[] = [
    { name: 'Product', url: 'product', icon: 'inventory' }
  ];

  constructor(private _sidenavService: SideNavigationService) { }

  /**
   *  on side navigation toggle
   */
  onSinenavToggle(): void {
    this.sideNavState = !this.sideNavState;
    this.linkText = this.sideNavState;
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}
