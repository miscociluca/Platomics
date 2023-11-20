import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { VexConfigService } from '../../../theme/@vex/config/vex-config.service';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { VexConfig } from '../../../theme/@vex/config/vex-config.interface';
import {HeaderComponent} from "../header/header.component";
@Component({
  selector: 'vex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
    imports: [
        BaseLayoutComponent,
        NgIf,
        AsyncPipe,
        NgTemplateOutlet,
        RouterOutlet,
        HeaderComponent,
    ],
  standalone: true
})
export class LayoutComponent {
  config$: Observable<VexConfig> = this.configService.config$;
  constructor(
    private readonly configService: VexConfigService
  ) {}
}
