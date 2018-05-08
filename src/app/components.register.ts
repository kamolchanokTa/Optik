//import components
import { AppComponent } from './app.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { RegisterationComponent } from './components/registeration/registeration.component';

//import services
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

export const bootstrap = [AppComponent];

export const componentList = [AppComponent, ProductOverviewComponent, RegisterationComponent];

export const serviceList = [ProductService, UserService];