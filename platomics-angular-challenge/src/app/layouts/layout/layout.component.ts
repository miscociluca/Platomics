import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import {HeaderComponent} from "../header/header.component";
@Component({
  selector: 'vex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
    imports: [
        BaseLayoutComponent,
        NgTemplateOutlet,
        RouterOutlet,
        HeaderComponent,
    ],
  standalone: true
})
export class LayoutComponent {

}
