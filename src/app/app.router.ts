import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { RegisterationComponent } from './components/registeration/registeration.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/product-overview', pathMatch: 'full' },
    { path: 'product-overview', component: ProductOverviewComponent },
    { path: 'registeration', component: RegisterationComponent },
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