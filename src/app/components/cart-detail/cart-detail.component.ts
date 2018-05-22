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
    selector: "#cart-detail",
    templateUrl: "./cart-detail.component.html",
    // styleUrls: ["./registeration.style.css"]
})

export class CartDetailComponent implements OnInit {
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
        private productSvc: ProductService,
        private route: ActivatedRoute,
        public cartService: CartService,
        private LocalStorage: LocalStorageService,
        public userService:UserService
        ){
    }

    checkout(){
        if(this.isAbleToCheckout()){
            this.saveCart();
        }
    }
    isAbleToCheckout(){
        if(this.userService.user.userid != ''){
            return true;
        }
        else{
            return false;
        }
    }

    saveCart(){
        let orderdetails = [];
        this.cartService.items.forEach((item, index) => {
            let orderdetail = {
                "productId": item.productid,
                "amount": item.quantity
            }
            orderdetails.push(orderdetail);
        });
        let totalpri = this.cartService.getTotalPrice(null);
        console.log(Date.now.toString());
        debugger;
        let cart = {
            "userid": this.userService.user.userid,// this.userService.getUserLocal(),
            "totalprice": this.cartService.getTotalPrice(null),
            "deliverymethod": "normal",
            "orderdetails":orderdetails,
            "orderdate": Date.now.toString()
            
        }
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.cartService.saveCartObjectInDB(cart).then((result) => {
            this.loading = true;
            console.log(result);
            this.cartService.clearItems();
            this.notifyMessages.push({ type: "confirm", message: "Successful create!! cart "  });

        }, failToSaveObjects);
    }
}