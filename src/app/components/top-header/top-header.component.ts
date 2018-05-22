import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, ProductObject} from "../../services/product.service";
import { LocalStorageService} from "../../services/local-storage.service";
import { CartService} from "../../services/cart-service";
import { UserService} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
@Component({
    selector: "#top-header",
    templateUrl: "./top-header.component.html",
    // styleUrls: ["./registeration.style.css"]
})

export class TopHeaderComponent implements OnInit {
    // private fields
    loading: boolean;
    notifyMessages: INotifyMessage[];
    isCheckoutProcessing: boolean

    product: any={
        id:this.route.snapshot.params['id'],
        name: this.route.snapshot.params['name'],
        description:this.route.snapshot.params['description'],
        availableproduct: this.route.snapshot.params['availableproduct'],
        productType: this.route.snapshot.params['productType'],
        price:this.route.snapshot.params['price']
    }
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        console.log("product in cart: " + this.product);
        this.isCheckoutProcessing= false;
    }

    constructor(private router: Router,
        public productSvc: ProductService,
        private route: ActivatedRoute,
        public cartService: CartService,
        private LocalStorage: LocalStorageService,
        public userService:UserService
        ){
    }
    isUserExist(){
        if(this.userService.user.userid != ''){
            return true;
        }
        else{
            return false;
        }
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        if(b64Data != ''){
            return "data:"+contentType+ ";base64,"+b64Data;
        }
    }
}