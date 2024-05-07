import { Component } from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ErrorsComponent} from "../errors/errors.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    DashboardComponent,
    ErrorsComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
