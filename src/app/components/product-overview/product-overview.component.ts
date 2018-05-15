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
        // contentType = contentType || '';
        // sliceSize = sliceSize || 512;

        // var byteCharacters = atob(b64Data);
        // var byteArrays = [];

        // for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     var slice = byteCharacters.slice(offset, offset + sliceSize);

        //     var byteNumbers = new Array(slice.length);
        //     for (var i = 0; i < slice.length; i++) {
        //         byteNumbers[i] = slice.charCodeAt(i);
        //     }

        //     var byteArray = new Uint8Array(byteNumbers);

        //     byteArrays.push(byteArray);
        // }
        // var blob = new Blob(byteArrays, {type: contentType});
        // let urlCreator = window.URL;
        // let imageData = this.sanitizer.bypassSecurityTrustUrl(
        //     urlCreator.createObjectURL(blob));
      
      return "data:image/jpeg;base64,"+b64Data;
    }
}
