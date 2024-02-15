import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route:Router){}
  logout()
  {
  sessionStorage.clear();
  this.route.navigate(['/login'])
  }
  show()
  {
    
  }
}
