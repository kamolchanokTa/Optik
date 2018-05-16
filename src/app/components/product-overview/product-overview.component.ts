import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  

import { ProductService, valueObject} from "../../services/product.service";

import * as _ from "lodash";

@Component({
    selector: "#po-table",
    templateUrl: "./product-overview.component.html",
    // styleUrls: ["./po-list.style.scss"]
})

export class ProductOverviewComponent implements OnInit {
    // private fields
    valueList: any[];
    loading: boolean;

    ngOnInit() {
        this.loading = true;
        this.valueList = [];
        this.getProducts();
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private sanitizer: DomSanitizer){
    }

    getProducts() {
        const failToGetValueObjects = (error: any) => {
            this.loading = false;
        };
        debugger;
        this.productSvc.getProductObject()
            .then((result) => {
                this.loading = false;
                this.valueList = result.data;
                    // _.forEach(result.data, function(product, sKey) {
                    //     if  (product != null) {
                    //       let value={
                    //           id: product.id,
                    //           name: product.name,
                    //           image: b64toBlob(product.image,'image/jpeg',512),
                    //           productType: product.productType,
                    //           price: product.price,
                    //           description: product.description,
                    //           availableproduct: product.availableproduct
                    //       }
                    //       this.valueList.push(value);
                    //     }
                    //   });
                console.log(result);
            }, failToGetValueObjects);
                // the first argument is a function which runs on success
                
    }

    b64toBlob(b64Data, contentType, sliceSize) {
      
      return "data:"+contentType+ ";base64,"+b64Data;
    }

    routeCreateProduct(){
        debugger;
        this.router.navigate(["/product-create", this.valueList[0]]);
    }
}
