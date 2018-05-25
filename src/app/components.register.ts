//import components
import { AppComponent } from './app.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { UpdateCreditComponent } from './components/update-credit/update-credit.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductDetailComponent} from './components/product-detail/product-detail.component';
import { CartDetailComponent} from './components/cart-detail/cart-detail.component';
import { TopHeaderComponent} from './components/top-header/top-header.component';
import { ProductsViewComponent } from './components/products/products.component';
import { LoadUserComponent } from './components/user-profile/user-profile.component';
import { LogoutComponent} from './components/logout/logout.component';

//import services
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { LocalStorageService} from './services/local-storage.service';
import { CartService} from './services/cart-service';

export const bootstrap = [AppComponent];


export const componentList = [
    AppComponent, 
    ProductOverviewComponent, 
    RegisterationComponent, 
    ProductCreationComponent,
    ProductDetailComponent,
    CartDetailComponent,
    LoginComponent,
    RegisterComponent,
    UpdateAddressComponent, 
    UpdateCreditComponent,
    TopHeaderComponent,
    ProductsViewComponent,
    LoadUserComponent,
    LogoutComponent
];

export const serviceList = [ProductService, UserService, LocalStorageService, CartService];