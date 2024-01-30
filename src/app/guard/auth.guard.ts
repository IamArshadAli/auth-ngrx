import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInfo } from '../Store/Model/User.model';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let menuName = '';

  if (route.url.length > 0) {
    menuName = route.url[0].path;
  }
  const userInfo: UserInfo = userService.getUserDataFromLocalStorage();
  if (userInfo.username != '' && userInfo.username != null) {
    if (menuName == '') return true;
    userService.haveMenuAccess(userInfo.role, menuName).subscribe((item) => {
      const _menuData = item;
      if (_menuData.length > 1) {
        return true;
      } else {
        alert('Unauthorized Access');
        router.navigate(['']);
        return false;
      }
    });
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
