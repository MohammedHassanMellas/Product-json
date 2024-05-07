import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> =[
    {title : "Home", "route":"/admin/home", icon : "house"},
    {title : "Products", "route":"/admin/products", icon : "search"},
    {title : "New Product", "route":"/admin/newProduct", icon : "safe"}
  ];
  currentAction : any;
  //public isLoading :boolean=false;
  constructor(public appState :AppStateService ,
              public loadingService : LoadingService,
              private router:Router) {
   /* this.loadingService.isLoading$.subscribe({
      next : value=>{
        this.isLoading=value;
      }
    })*/
  }

  setCurrentAction(action : any){
    this.currentAction = action;
  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login")
  }

  login() {
    this.router.navigateByUrl("/login")
  }
}
