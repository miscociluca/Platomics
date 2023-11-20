import {NgModule, importProvidersFrom} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {HeaderComponent} from './layouts/header/header.component';
import {NgxsModule} from '@ngxs/store';
import {VariantsState} from './store/variants.state';
import {LayoutModule} from "@angular/cdk/layout";
import {MuiDataTableComponent} from "./shared/mui-datatable/mui-datatable.component";
import {MatIconModule} from "@angular/material/icon";
import {VariantListComponent} from "./variants/variant-list/variant-list.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatNativeDateModule} from "@angular/material/core";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {vexConfigs} from "../theme/@vex/config/vex-configs";
import {provideVex} from "../theme/@vex/vex.provider";
import {VariantModalComponent} from "./variants/modals/variant-modal/variant-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxSpinnerModule} from "ngx-spinner";
import {ScrollTableComponent} from "./shared/infinite-scolling-datatable/scroll-datatable.component";

@NgModule({
  declarations: [
    AppComponent,
    VariantListComponent,
    VariantModalComponent
  ],
    imports: [
        NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
        MuiDataTableComponent,
        LayoutModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderComponent,
        NgxsModule.forRoot([VariantsState]),
        ReactiveFormsModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        ScrollTableComponent
    ],
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatDialogModule,
      MatBottomSheetModule,
      MatNativeDateModule
    ),
    provideVex({
      config: vexConfigs.apollo,
      availableThemes: [
        {
          name: 'Default',
          className: 'vex-theme-default'
        }
      ]
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
