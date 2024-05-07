import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(public appState : AppStateService) {
  }
  ngOnInit(): void {
  }

  totalCheckedProducts() {
    let checkedProducts =
      this.appState.productsState.products.filter(
        (p:any)=>p.checked==true);
  return checkedProducts.length;
  }
}
