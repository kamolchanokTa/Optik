//import components
import { AppComponent } from './app.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';

//import services
import { ProductService } from './services/product.service';

export const bootstrap = [AppComponent];

export const componentList = [AppComponent, ProductOverviewComponent];

export const serviceList = [ProductService];