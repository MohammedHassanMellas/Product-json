import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent {
  constructor(public appState : AppStateService) {
  }

}
