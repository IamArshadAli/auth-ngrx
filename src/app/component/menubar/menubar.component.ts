import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements DoCheck {
  isMenuVisible = false;
  constructor(private router: Router){} 
  ngDoCheck(): void {
    const currentRoute = this.router.url
    if (currentRoute === "/login" || currentRoute === "/register") {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }
}
