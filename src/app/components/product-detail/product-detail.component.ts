import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, ProductObject, ProductCartObject} from "../../services/product.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import { LocalStorageService} from "../../services/local-storage.service";
import { CartService} from "../../services/cart-service";

import * as _ from "lodash";
@Component({
    selector: "#product-detail",
    templateUrl: "./product-detail.component.html",
    // styleUrls: ["./registeration.style.css"]
})

export class ProductDetailComponent implements OnInit {
    // private fields
    loading: boolean;
    notifyMessages: INotifyMessage[];
    productId: string = this.route.snapshot.params['id'];

    product: any={
        id:'',
        name: '',
        description:'',
        availableproduct: 0,
        image:'',
        productType: '',
        price:''
    }
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        this.route.snapshot.params['id'];
        console.log("id: " + this.productId);
        this.getProduct();
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private route: ActivatedRoute,
        public cartService: CartService,
        private LocalStorage: LocalStorageService
        ){
    }

    getProduct() {
        this.loading = true;
        debugger;
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        let product = {
            id:this.productId
        }
        this.productSvc.getProduct(product)
            .then((result) => {
                this.loading = true;
                this.product= result;
                console.log(this.product);
                this.notifyMessages.push({ type: "confirm", message: "Successful create!! product "  });
            }, failToSaveObjects);
                
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        if(b64Data != ''){
            return "data:"+contentType+ ";base64,"+b64Data;
        }
    }

    addToCart(product: any){
        this.cartService.addItem(product.id,product.price,1,5,product.name, product.description, product.availableproduct, product.image,product.productType);
    }
}