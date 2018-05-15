import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { UpdateCreditComponent } from './components/update-credit/update-credit.component';

import { ProductCreationComponent } from './components/product-creation/product-creation.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/product-overview', pathMatch: 'full' },
    { path: 'product-overview', component: ProductOverviewComponent },
    { path: 'registeration', component: RegisterationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'update-address', component: UpdateAddressComponent },
    { path: 'update-credit', component: UpdateCreditComponent },
    { path: 'product-create', component: ProductCreationComponent },
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