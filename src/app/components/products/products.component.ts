import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  

import { ProductService, valueObject} from "../../services/product.service";
import { CartService} from "../../services/cart-service";

import * as _ from "lodash";

@Component({
    selector: "#store",
    templateUrl: "./products.component.html",
})

export class ProductsViewComponent implements OnInit {
    // private fields
    productList: any[];
    loading: boolean;

    ngOnInit() {
        this.loading = true;
        this.productList = [];
        this.getProducts();
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private sanitizer: DomSanitizer,
        public cartService: CartService){
    }

    getProducts() {
        const failToGetValueObjects = (error: any) => {
            this.loading = false;
        };
        debugger;
        this.productSvc.getProducts()
            .then((result) => {
                this.loading = false;
                let count = 0; 
                this.productList = result.data;
                console.log(result);
            }, failToGetValueObjects);
                // the first argument is a function which runs on success
                
    }

    b64toBlob(b64Data, contentType, sliceSize) {
      return "data:"+contentType+ ";base64,"+b64Data;
    }

    moreDetail(id: String){
        let product = {
            id: id
        };
        this.router.navigate(["/product-detail", product]);
    }

    addToCart(product: any){
        this.cartService.addItem(product.id,product.price,1,5,product.name, product.description, product.availableproduct, product.image,product.productType);
    }
}
