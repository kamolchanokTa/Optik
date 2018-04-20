import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

export class ProductObject {
    id: number;
    name: string;
}

export class valueObject{
    id: number;
    name: string
}
@Injectable()
export class ProductService {

    private baseUri: string = `api`;

    constructor(private $http: HttpClient) { }

    getProductObject = () => {
        const getPackageSuccess = (response: any): Promise<ProductObject[]> => {            
            return response.json() || {};
        }

        return this.$http.get(this.baseUri + `/product-overview`)
            .toPromise()
            .then(getPackageSuccess)
            .catch(this.errorHandler);
    }

    getValueObjects = () => {
        const getPackageSuccess = (response: any): Promise<valueObject[]> => {            
            return response || {};
        }

        return this.$http.get(this.baseUri + `/values`)
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
