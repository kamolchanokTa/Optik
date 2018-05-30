import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, ProductObject} from "../../services/product.service";
import { LocalStorageService} from "../../services/local-storage.service";
import { CartService} from "../../services/cart-service";
import { UserService} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
import { Z_DEFAULT_STRATEGY } from "zlib";
@Component({
    selector: "#order-history",
    templateUrl: "./order-history.component.html",
    // styleUrls: ["./registeration.style.css"]
})

export class OrderHistoryComponent implements OnInit {
    // private fields
    loading: boolean;
    notifyMessages: INotifyMessage[];
    carts: any;
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
        this.getOrdersByCustomeId(this.userService.user.userid);
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private route: ActivatedRoute,
        public cartService: CartService,
        private LocalStorage: LocalStorageService,
        public userService:UserService
        ){
    }

    getOrdersByCustomeId(userid: string){
        const failToLoadObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        let user = {
            "userid": userid,
            "sessionKey": this.userService.user.sessionKey
        }
        this.cartService.getOrdersByCustomeId(user).then((result) => {
            this.loading = false;
            this.carts = result;
            console.log(this.carts);
        }, failToLoadObjects);
    }
    isAbleToCheckout(){
        if(this.userService.user.userid != null && this.userService.user.address != null && this.userService.user.creditcard != null)
        {
            return true;
        }
        else{
            return false;
        }
    }

    isUserCreated(){
        if(this.userService.user.userid != null){
            return true;
        }
        else{
            return false;
        }
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        return "data:"+contentType+ ";base64,"+b64Data;
    }
}