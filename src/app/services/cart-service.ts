import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

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

    constructor(private $http: HttpClient) {
        this.loadItems();

    }

    // load items from local storage
    loadItems() {

        let items = localStorage != null ? localStorage[this.cartName + '_items'] : null;
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
        debugger;
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
        }
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
                totalPrice += (this.toNumber(item.quantity) * this.toNumber(item.unitprice)) + this.toNumber(item.shippingCost);
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

    createGuproductid4(): string {
        return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function(c: string) {
            const r = Math.floor(Math.random() * 16),
                v = c === 'x' ? r : (r % 4 + 4);
            return v.toString(16);
        }).toUpperCase();
    }

    // check out using PayPal for details see:
    // www.paypal.com/cgi-bin/webscr?cmd=p/pdn/howto_checkout-outsproductide
    // See: https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guproductide/Appx_websitestandard_htmlletiables/
    // enable PayPal checkout
    // note: the second parameter productidentifies the merchant; in order to use the
    // shopping cart with PayPal, you have to create a merchant account with
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    // myCart.addCheckoutParameters("PayPal", "paypaluser@youremail.com");
    // this.addCheckoutParameters('PayPal', this.PAYMENT_PAYPAL_BUYNOW, {});
    checkoutPayPal() {

        if (this.config.PAYPAL_BUYNOW_EMAIL_OR_productid === 'PAYPAL_BUYNOW_EMAIL_OR_productid') {
            alert('You must first enter your PayPal Email Addres ' +
                  'or PayPal Company productid in config.json. Cancelling Checkout...');
            return;
        }

        let bFoundFaux = false;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.faux) {
                bFoundFaux = true;
                this.items.splice(i, 1);
            }
        }
        if (this.items.length < 1) {
            alert('Faux items in your cart are not for sale and were removed!');
            this.clearCart = this.clearCart === null || this.clearCart;
            return;
        }

        if (bFoundFaux) {
            alert('Faux items in your cart are not for sale and were removed!');
        }

        const myArray = [];
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            myArray.push(this.toNumber(item.sh));
        }
        let totalSH = 0;
        if (myArray.length > 0) {
            totalSH = Math.max.apply(Math, myArray);
        }

        // The cost of shipping this item. If you specify shipping and shipping2 is not defined,
        // this flat amount is charged regardless of the quantity of items purchased.
        // This shipping letiable is valproductid only for Buy Now and Add to Cart buttons.
        // Default — If profile-based shipping rates are configured, buyers are charged an amount
        // according to the shipping methods they choose.

        // global data  _xclick   _cart
        const data = {
            cmd: '_cart',
            business: this.config.PAYPAL_BUYNOW_EMAIL_OR_productid,
            upload: '1',
            rm: '2',
            charset: 'utf-8'
        };

        // item data
        let bShipping = false;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const ctr = i + 1;
            data['item_number_' + ctr] = item.productid;
            const z1 = item.productid;
            const z2 = z1.replace('&#8482;', '™');  // &#8482; //TM
            const z3 = z2.replace('&#8480;', '℠');  // &#8480; //SM
            const z4 = z3.replace('&#174', '®');  // &#174   //Registered
            const z5 = z4.replace('&#169;', '©');  // &#169;  //Copyright
            const z6 = z5.replace('&#8471;', '℗');  // &#8471; //Patent
            data['item_name_' + ctr] = z6;
            data['quantity_' + ctr] = item.quantity;
            data['amount_' + ctr] = item.unitprice.toFixed(2);
            if (totalSH.toFixed(2) === item.sh.toFixed(2)) {
                if (!bShipping) {
                    data['shipping_' + ctr] = totalSH.toFixed(2);
                    bShipping = true;
                }
            }
        }

        // build form
        const form = $('<form/></form>');
        form.attr('action', 'https://www.paypal.com/cgi-bin/webscr');
        form.attr('method', 'POST');
        // form.attr('notify_url', 'http://www.YOUR_DOMAIN.com/ac_notify.html');
        // form.attr('cancel_return', 'http://www.YOUR_DOMAIN.com/ac_cancel.html');
        form.attr('notify_url', 'http://www.sergioapps.com/cart_notify.aspx');
        form.attr('cancel_return', 'http://www.sergioapps.com/cart_cancel.aspx');
        ///////////////////////////////////////////////////////////
        // PayPal's custom html letiable returned to ac_notify.html
        let _dproductid = this.config.DISTRIBUTOR_productid;

        if (localStorage['dproductid']) {
            const t = localStorage['dproductid'];
            if (t !== 'undefined') {
                for (let x = 0; x < this.config.DISTRIBUTORS.length; x++) {
                    if (t === this.config.DISTRIBUTORS[x].dproductid) {
                        _dproductid = _dproductid + '|' + t;
                        break;
                    }
                }
            }
        }

        // form.attr('custom', _dproductid + '|' + _dproductid2);
        form.attr('custom', _dproductid);
        // form.attr('item_number', 'ac_item_number');
        // form.attr('item_number_x', 'ac_item_number_x');
        form.attr('invoice', this.createGuproductid4());
        
        const options = [];
        form.attr('style', 'display:none;');
        this.addFormFields(form, data);
        this.addFormFields(form, options);
        $('body').append(form);

        // alert(form.attr('custom'));

        // submit form
        this.clearCart = this.clearCart === null || this.clearCart;
        form.submit();

        // form.attr('action', 'http://www.sergioapps.com/test.html');
        // form.submit();

        form.remove();

    }

    // check out using Google Wallet
    // for details see:
    // developers.google.com/checkout/developer/Google_Checkout_Custom_Cart_How_To_HTML
    // developers.google.com/checkout/developer/interactive_demo
    // enable Google Wallet checkout
    // note: the second parameter productidentifies the merchant; in order to use the
    // shopping cart with Google Wallet, you have to create a merchant account with
    // Google. You can do that here:
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    // myCart.addCheckoutParameters("Google", "GooGle_Wallet_productid",
    // this.addCheckoutParameters('Google', this.PAYMENT_GOOGLE_WALLET_productid,
    //     {
    //         ship_method_name_1: 'UPS Next Day Air',
    //         ship_method_price_1: '20.00',
    //         ship_method_currency_1: 'USD',
    //         ship_method_name_2: 'UPS Ground',
    //         ship_method_price_2: '15.00',
    //         ship_method_currency_2: 'USD'
    //     }
    // );
    checkoutGoogle() {

        if (this.config.GOOGLE_WALLET_productid === 'GOOGLE_WALLET_productid') {
            alert('You must first enter your Google Wallet productid ' +
                  'in config.json. Cancelling Checkout...');
            return;
        }

        let options: any;
        options = {
                ship_method_name_1: 'UPS Next Day Air',
                ship_method_price_1: '20.00',
                ship_method_currency_1: 'USD',
                ship_method_name_2: 'UPS Ground',
                ship_method_price_2: '15.00',
                ship_method_currency_2: 'USD'
            };

        let bFoundFaux = false;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.faux) {
                bFoundFaux = true;
                this.items.splice(i, 1);
            }
        }
        if (this.items.length < 1) {
            alert('Faux items in your cart are not for sale and were removed!');
            this.clearCart = this.clearCart === null || this.clearCart;
            return;
        }
        if (bFoundFaux) {
            alert('Faux items in your cart are not for sale and were removed!');
        }

        // global data
        const data = {};

        ///////////////////////////////////////////////////////////
        // PayPal's custom html letiable returned to ac_notify.html
        // let _dproductid = localStorage['ac_distributorproductid'];
        // if (_dproductid === null || _dproductid === 'undefined') {
        //    _dproductid = "nodproductid";
        // }
        // data['custom_' + ctr] = _dproductid;
        ///////////////////////////////////////////////////////////

        // item data
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const ctr = i + 1;
            data['item_name_' + ctr] = item.productid;
            data['item_description_' + ctr] = item.productname;
            data['item_price_' + ctr] = item.unitprice.toFixed(2);
            data['item_quantity_' + ctr] = item.quantity;
            data['item_merchant_productid_' + ctr] = this.config.PAYMENT_GOOGLE_WALLET_productid;
        }

        // build form
        const form = $('<form/></form>');
        // NOTE: in production projects, use the checkout.google url below;
        // for debugging/testing, use the sandbox.google url instead.
        // form.attr("action", "https://checkout.google.com/api/checkout/v2/merchantCheckoutForm/Merchant/" + parms.merchantproductid);
        form.attr('action', 'https://sandbox.google.com/checkout/api/checkout/v2/checkoutForm/Merchant/' +
         this.config.PAYMENT_GOOGLE_WALLET_productid);
        form.attr('method', 'POST');
        form.attr('style', 'display:none;');
        this.addFormFields(form, data);
        this.addFormFields(form, options);
        $('body').append(form);

        // submit form
        this.clearCart = this.clearCart == null || this.clearCart;
        form.submit();
        form.remove();
    }

    // check out using Stripe
    // for details see:
    // https://stripe.com/docs/checkout
    // enable Stripe checkout
    // note: the second parameter productidentifies your publishable key; in order to use the
    // shopping cart with Stripe, you have to create a merchant account with
    // Stripe. You can do that here:
    // https://manage.stripe.com/register
    // myCart.addCheckoutParameters("Stripe", "pk_test_stripe",
    // this.addCheckoutParameters('Stripe', this.PAYMENT_STRIPE,
    //     {
    //         chargeurl: 'https://localhost:1234/processStripe.aspx'
    //     }
    // );
    checkoutStripe() {

        if (this.config.STRIPE_productid === 'STRIPE_productid') {
             alert('You must first enter your Stripe productid ' +
                  'in config.json. Cancelling Checkout...');
            return;
        }

        // myCart.addCheckoutParameters("Stripe", "pk_test_stripe",
        // this.addCheckoutParameters('Stripe', this.PAYMENT_STRIPE,
        const options = { chargeurl: 'https://localhost:1234/processStripe.aspx' };

        let bFoundFaux = false;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.faux) {
                bFoundFaux = true;
                this.items.splice(i, 1);
            }
        }
        if (this.items.length < 1) {
            alert('Faux items in your cart are not for sale and were removed!');
            this.clearCart = this.clearCart === null || this.clearCart;
            return;
        }
        if (bFoundFaux) {
            alert('Faux items in your cart are not for sale and were removed!');
        }

        // global data
        const data = {};

        ///////////////////////////////////////////////////////////
        // PayPal's custom html letiable returned to ac_notify.html
        // let _dproductid = localStorage['ac_distributorproductid'];
        // if (_dproductid === null || _dproductid === 'undefined') {
        //    _dproductid = 'nodproductid';
        // }
        // data['custom_' + ctr] = _dproductid;
        ///////////////////////////////////////////////////////////

        // item data
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const ctr = i + 1;
            data['item_name_' + ctr] = item.productid;
            data['item_description_' + ctr] = item.productname;
            data['item_price_' + ctr] = item.unitprice.toFixed(2);
            data['item_quantity_' + ctr] = item.quantity;
        }

        // build form
        const form = $('.form-stripe');
        form.empty();
        // NOTE: in production projects, you have to handle the post with a few simple calls to the Stripe API.
        // See https://stripe.com/docs/checkout
        // You'll get a POST to the address below w/ a stripeToken.
        // First, you have to initialize the Stripe API w/ your public/private keys.
        // You then call Customer.create() w/ the stripeToken and your email address.
        // Then you call Charge.create() w/ the customer productid from the previous call and your charge amount.
        form.attr('action', options['chargeurl']);
        form.attr('method', 'POST');
        form.attr('style', 'display:none;');
        this.addFormFields(form, data);
        this.addFormFields(form, options);
        $('body').append(form);

        // ajaxify form
        form.ajaxForm({
            success: function () {
                $.unblockUI();
                alert('Thanks for your order!');
            },
            error: function (result) {
                $.unblockUI();
                alert('Error submitting order: ' + result.statusText);
            }
        });

        const token = function (res) {
            const $input = $('<input type=hproductidden name=stripeToken />').val(res.productid);

            // show processing message and block UI until form is submitted and returns
            $.blockUI({ message: 'Processing order...' });

            // submit form
            form.append($input).submit();
            this.clearCart = this.clearCart === null || this.clearCart;
            form.submit();
        };

        // WS
        // StripeCheckout.open({
        //     key: parms.merchantproductid,
        //     address: false,
        //     amount: this.getTotalPrice() * 100, /** expects an integer **/
        //     currency: 'usd',
        //     name: 'Purchase',
        //     description: 'Description',
        //     panelLabel: 'Checkout',
        //     token: token
        // });
    }

    // utility methods
    addFormFields(form, data) {
        if (data != null) {
            $.each(data, function (name, value) {
                if (value != null) {
                    const input = $('<input></input>').attr('type', 'hproductidden').attr('name', name).val(value);
                    form.append(input);
                }
            });
        }
    }
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

// WS
    // ----------------------------------------------------------------
    // checkout parameters (one per supported payment service)
    //
    checkoutParameters(serviceName, merchantproductid, options) {
        this.serviceName = serviceName;
        this.merchantproductid = merchantproductid;
        this.options = options;
        return this;
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




