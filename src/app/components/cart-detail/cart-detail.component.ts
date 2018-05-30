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
    isCheckoutProcessing: boolean;
    isOpenLogin: boolean;
    shipment: any;
    shipmentMethod: any;
    billingStep :number;
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
        this.isOpenLogin= false;
        this.isCheckoutProcessing= false;
        this.shipment = [];
        this.billingStep= 0;
        this.shipment.push({ 
            id: 0,
            name: "Free Shipping",
            price: 0
        });
        this.shipment.push({
            id:1,
            name: "Standard",
            price: 5
        });
        this.shipmentMethod = {
            id: 0,
            name: "Free Shipping",
            price: 0
        }
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
    isAddressUpdated(){
        if(this.userService.user.address != null){
            return true;
        }
        else{
            return false;
        }
    }
    isCreditCardUpdated(){
        if(this.userService.user.creditcard != null){
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
        let cart = {
            "userid": this.userService.user.userid,// this.userService.getUserLocal(),
            "totalprice": this.cartService.getTotalPrice(null),
            "deliverymethod": "normal",
            "orderdetails":orderdetails,
            "orderdate": Date.now.toString(),
            "sessionKey": this.userService.user.sessionKey
            
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

    b64toBlob(b64Data, contentType, sliceSize) {
        return "data:"+contentType+ ";base64,"+b64Data;
    }

    onSelectionChange(selectedShipping: any) {
        this.shipmentMethod = selectedShipping;
        this.cartService.updateShipping(this.shipmentMethod.price);
    }

    loginOpen() {
        this.isOpenLogin = true;
    }
}