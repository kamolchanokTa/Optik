import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { } from 'base64-img';


export class ProductObject {
    name: string;
    productType: string;
    image: string;
    price: number;
    description: string;
}

export class ProductCartObject {
    id: string
    name: string;
    productType: string;
    image: string;
    price: number;
    description: string;
    availableproduct: number;
    quantity: number;
}

export class ResponseObject {
    status: string;
    message: string;
    data: any;
}

export class valueObject{
    id: number;
    name: string
}
@Injectable()
export class ProductService {

    private baseUri: string = `api`;

    constructor(private $http: HttpClient) { }

    getProducts = () => {
        const getPackageSuccess = (response: any): Promise<ResponseObject> => {            
            return response || {};
        }

        return this.$http.get(this.baseUri + `/product-overview`)
            .toPromise()
            .then(getPackageSuccess)
            .catch(this.errorHandler);
    }

    saveProductObject = (product: ProductObject) => {
        const saveProductSuccess = (response: any): Promise<any> => {            
            return response || {};
        }

        return this.$http.post(this.baseUri + `/product/save`, product)
            .toPromise()
            .then(saveProductSuccess)
            .catch(this.errorHandler);
    }

    getProduct = (productId: any) => {
        const getPackageSuccess = (response: any): Promise<any> => {            
            return response || {};
        }
        console.log("product Id: "+ productId);
        debugger;
        return this.$http.post(this.baseUri + `/product/get`,productId)
            .toPromise()
            .then(getPackageSuccess)
            .catch(this.errorHandler);
        //return this.$http.get('/api/food').ca;
    }

    private errorHandler = (error: any): Promise<any> =>{
        let errMsg: string;
        errMsg = error.message ? error.message : error.text();
        console.log('seee');

        return Promise.reject(errMsg);
    }
}
