import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { PersistenceService, StorageType, PersistenceConfig } from 'angular-persistence';

declare var jQuery: any;
declare var $: any;


@Injectable()
export class CartService {

    private baseUri: string = `api`;

    public config: any;
    private cartItemsObserver: any;
    public cartName = 'CartDetail';
    public clearCart = false;
    public items = [];

    productid: string;
    unitprice: any;
    quantity: any;
    shippingCost: any;
    productName: any;
    productDescription: any;
    productAmount: any;
    productImage: any;
    productType: any;

    serviceName: any;
    merchantproductid: any;
    options: any;

    constructor(private $http: HttpClient, private persistenceService: PersistenceService) {
        this.loadItems();

    }

    // load items from local storage
    loadItems() {

        let items =  this.persistenceService.get(this.cartName,StorageType.SESSION) != null ? this.persistenceService.get(this.cartName,StorageType.SESSION) : null;
        debugger;
        if (items != null && JSON != null) {
            try {
                items = JSON.parse(items);
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    if (item.productid != null &&
                        item.unitprice != null && item.quantity != null) {
                        item = new this.cartItem(item.productid,item.unitprice,item.quantity, item.shippingCost,item.productName,item.productDescription, item.productAmount,item.productImage,item.productType);
                        this.items.push(item);
                    }
                }
            } catch (err) {
                // ignore errors while loading...
            }
        }
        return items;
    }

    // save items to local storage
    saveItems() {
        let persistenceConfig: PersistenceConfig;
        persistenceConfig = {
            type:StorageType.SESSION,
            timeout: 1200000,
            expireAfter:1200000,
            oneUse: false
        }
        //localStorage[this.userName + '_items'] = JSON.stringify(this.user);
        this.persistenceService.set(this.cartName,JSON.stringify(this.items), persistenceConfig);
    }

    // adds an item to the cart
    addItem(productid, unitprice,quantity, shippingCost,productName,productDescription, productAmount,productImage,productType) {
        const _return = true;
        let found = false;
        debugger;
        for (let i = 0; i < this.items.length && !found; i++) {
            const item = this.items[i];
            if (item.productid === productid) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }
        // if item wasn't already in cart, add it now
        if (!found) {
            const item = new this.cartItem(productid,unitprice, quantity,shippingCost,productName,productDescription, productAmount,productImage,productType);
            this.items.push(item);
        }
        // save changes
        this.saveItems();
    return _return;
    }

    // get the total shipping & handling for all items currently in the cart
    // You can customize this any way you want.
    // Here I decproductided to charge whatever the max sh is for the items in the cart
    getTotalShipping(productid) {
        const myArray = [];
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // alert(this.toNumber(item.sh));
            if (productid === null || item.productid === productid) {
                // alert(this.toNumber(item.sh));
                myArray.push(this.toNumber(item.shippingCost));
            }
        }
        if (myArray.length < 1) {
            return undefined;
        } else {
            return Math.max.apply(Math, myArray);
        }
    }

    // get the total price for all items currently in the cart
    getTotalCount(productid) {
        let count: any;
        count = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (productid === null || item.productid === productid) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;
    }

    getTotalPrice(productid) {
        let totalPrice: any;
        totalPrice = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (productid === null || item.productid === productid) {
                totalPrice += (this.toNumber(item.quantity) * this.toNumber(item.unitprice)) ;
            }
        }
        totalPrice += this.toNumber(this.shippingCost)
        return totalPrice;
    }

    getTotalPriceExcludeShipping(productid) {
        let totalPrice: any;
        totalPrice = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (productid === null || item.productid === productid) {
                totalPrice += (this.toNumber(item.quantity) * this.toNumber(item.unitprice));
            }
        }
        return totalPrice;
    }

    // clear the cart
    clearItems() {
        this.items = [];
        this.saveItems();
        localStorage.removeItem(this.cartName + '_items');
    }

    getOrdersByCustomeId(user: any){
        const getOrdersSuccess = (response: any): Promise<any> => {            
            return response || {};
        }
        return this.$http.post(this.baseUri + `/cart/get/user`, user)
            .toPromise()
            .then(getOrdersSuccess)
            .catch(this.errorHandler);
    }

    // utility methods
    toNumber(value) {
        const num: any = this.stripNonNumeric(value);
        value = num * 1;
        return isNaN(value) ? 0 : value;
    }

    stripNonNumeric(str) {
        str += '';
        const rgx = /^d|.|-$/;
        let out = '';
        for (let i = 0; i < str.length; i++) {
            if (rgx.test(str.charAt(i))) {
                if (!((str.charAt(i) === '.' && out.indexOf('.') !== -1) ||
                    (str.charAt(i) === '-' && out.length !== 0))) {
                    out += str.charAt(i);
                }
            }
        }
        return out;
    }

    // ----------------------------------------------------------------
    // items in the cart
    //
    cartItem(productid, unitprice, quantity, shippingCost,productName,productDescription, productAmount,productImage,productType) {
        this.productid = productid;
        this.unitprice = unitprice * 1;
        this.quantity = quantity * 1;
        this.shippingCost = shippingCost*1;
        this.productName = productName;
        this.productDescription= productDescription;
        this.productAmount = productAmount;
        this.productImage = productImage;
        this.productType=productType;
    }
    updateShipping(shippingCost){
        this.shippingCost = shippingCost*1;
    }

    saveCartObjectInDB = (cart: any) => {
        const saveCartSuccess = (response: any): Promise<any> => {            
            return response || {};
        }

        return this.$http.post(this.baseUri + `/cart/save`, cart)
            .toPromise()
            .then(saveCartSuccess)
            .catch(this.errorHandler);
    }

    private errorHandler = (error: any): Promise<any> =>{
        let errMsg: string;
        errMsg = error.message ? error.message : error.text();
        console.log('seee');

        return Promise.reject(errMsg);
    }
}




