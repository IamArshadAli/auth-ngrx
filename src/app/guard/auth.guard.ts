import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInfo } from '../Store/Model/User.model';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userInfo: UserInfo = userService.getUserDataFromLocalStorage();
  if (userInfo.username != '' && userInfo.username != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
