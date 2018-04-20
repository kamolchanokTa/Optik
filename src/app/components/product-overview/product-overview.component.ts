import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, valueObject} from "../../services/product.service";

import * as _ from "lodash";

@Component({
    selector: "#po-table",
    templateUrl: "./product-overview.component.html",
    // styleUrls: ["./po-list.style.scss"]
})

export class ProductOverviewComponent implements OnInit {
    // private fields
    valueList: any;
    loading: boolean;
    ngOnInit() {
        this.loading = true;
        this.getValueObjects();
    }

    constructor(private router: Router,
        private productSvc: ProductService){
    }

    getValueObjects() {
        const failToGetValueObjects = (error: any) => {
            this.loading = false;
        };
        debugger;
        this.productSvc.getValueObjects()
            .then((result) => {
                this.loading = false;
                this.valueList = result;
                console.log(result);
            }, failToGetValueObjects);
                // the first argument is a function which runs on success
                
    }
}
