import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductOverviewComponent } from './components/product-overview/product-overview.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/product-overview', pathMatch: 'full' },
    { path: 'product-overview', component: ProductOverviewComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RouteModule { }