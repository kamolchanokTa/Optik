//import components
import { AppComponent } from './app.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductDetailComponent} from './components/product-detail/product-detail.component';
import { CartDetailComponent} from './components/cart-detail/cart-detail.component';

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
    CartDetailComponent
];

export const serviceList = [ProductService, UserService, LocalStorageService, CartService];