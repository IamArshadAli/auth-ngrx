import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RoleAccess, UserInfo } from '../../Store/Model/User.model';
import { getMenuByRole } from '../../Store/User/User.selectors';
import { fetchMenu } from '../../Store/User/User.action';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements DoCheck, OnInit {
  isMenuVisible = false;
  menuList!: RoleAccess[];

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    if (localStorage.getItem('userData') != null) {
      let jsonString = localStorage.getItem('userData') as string;
      const _userObj = JSON.parse(jsonString) as UserInfo;
      this.store.dispatch(fetchMenu({ userRole: _userObj.role }));
    }

    this.store
      .select(getMenuByRole)
      .subscribe((item) => (this.menuList = item));
  }

  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/login' || currentRoute === '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }
}
