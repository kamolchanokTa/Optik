import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

export class UserObject {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: string
    city: string
    country: string;
    zipcode: string;
    userType: string;
    dob: string;
}

export class responseObject{
    type: string;
    data: any
}
@Injectable()
export class UserService {

    private baseUri: string = `api`;

    constructor(private $http: HttpClient) { }

    loginSystem = () => {
        const getPackageSuccess = (response: any): Promise<responseObject[]> => {            
            return response.json() || {};
        }

        return this.$http.get(this.baseUri + `/user/login`)
            .toPromise()
            .then(getPackageSuccess)
            .catch(this.errorHandler);
    }

    signupUserObject = (data: UserObject) => {
        const signupUserObjectSuccess = (response: any): Promise<responseObject> => {            
            return response || {};
        }

        return this.$http.post(this.baseUri + `/user/save`,data)
            .toPromise()
            .then(signupUserObjectSuccess)
            .catch(this.errorHandler);
    }

    private errorHandler = (error: any): Promise<any> =>{
        let errMsg: string;
        errMsg = error.message ? error.message : error.text();
        console.log('seee');

        return Promise.reject(errMsg);
    }
}
