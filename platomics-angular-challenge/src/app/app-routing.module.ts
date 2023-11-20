import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VariantListComponent} from "./variants/variant-list/variant-list.component";
import {LayoutComponent} from "./layouts/layout/layout.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: VariantListComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
