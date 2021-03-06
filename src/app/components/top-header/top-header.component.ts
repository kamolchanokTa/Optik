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
    styleUrls: ["./top-header.style.css"]
})

export class TopHeaderComponent implements OnInit {
    // private fields
    loading: boolean;
    notifyMessages: INotifyMessage[];
    isCheckoutProcessing: boolean;
    isAdmin: boolean;

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
        this.isAdmin = false;
        this.notifyMessages = [];
        this.isCheckoutProcessing= false;
        this.checkAuthorize();
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
        if(this.userService.user.userid != null){
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

    checkAuthorize(){
        if(this.userService.user.userType != 0){
            this.isAdmin = false;
        }
        else{
            this.isAdmin= true;
        }
    }
}