import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {VexConfigService} from '../../../theme/@vex/config/vex-config.service';
import {VexConfig} from '../../../theme/@vex/config/vex-config.interface';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe,
        NgIf
    ]
})
export class BaseLayoutComponent {
    config$: Observable<VexConfig> = this.configService.config$;
    constructor(private readonly configService: VexConfigService) {}
}
