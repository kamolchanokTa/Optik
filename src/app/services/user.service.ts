import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { PersistenceService, StorageType, PersistenceConfig } from 'angular-persistence';

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
    public userName = 'UserName';
    public user = {
        name: null,
        userid: null,
        address: null,
        creditcard: null,
        sessionKey: null,
        userType: null
    }

    constructor(private $http: HttpClient, private persistenceService: PersistenceService) {
        this.loadUser();
     }

    // load items from local storage
    loadUser() {

        //let item = localStorage != null ? localStorage[this.userName + '_items'] : null;
        let item =  this.persistenceService.get(this.userName,StorageType.SESSION) != null ? this.persistenceService.get(this.userName,StorageType.SESSION) : null;

        if (item != null && JSON != null) {
            try {
                item = JSON.parse(item);
                this.user = {
                    name: item.name,
                    userid: item.userid,
                    address: item.address,
                    creditcard:item.creditcard,
                    sessionKey: item.sessionKey,
                    userType: item.userType
                }
            } catch (err) {
                // ignore errors while loading...
            }
        }
        return this.user;
    }

    // save items to local storage
    saveUser() {
        let persistenceConfig: PersistenceConfig;
        persistenceConfig = {
            type:StorageType.SESSION,
            timeout: 1200000,
            expireAfter:1200000,
            oneUse: false
        }
        //localStorage[this.userName + '_items'] = JSON.stringify(this.user);
        this.persistenceService.set(this.userName,JSON.stringify(this.user), persistenceConfig);
    }

    //search user by id
    searchUserbyID() {
        const searchUserObjectSuccess = (response: any): Promise<responseObject> => {     
            return response || {};
        }

        var userID = this.user.userid;

        let params = new HttpParams().set("id",userID);
        params.append("id", userID);
        return this.$http.get(this.baseUri + `/user`, {params:params})
            .toPromise()
            .then(searchUserObjectSuccess)
            .catch(this.errorHandler);

    }

    addItem(name,userid,address,creditcard,sessionKey, userType) {
        const _return = true;
        this.user = {
            name:name,
            userid: userid,
            address:address,
            creditcard:creditcard,
            sessionKey: sessionKey,
            userType: userType
        }
        // save changes
        this.saveUser();
    return _return;
    }
	
	login = (email: string, password: string, sessionKey: string) => {
        const getPackageSuccess = (response: any): Promise<responseObject> => {            
            return response || {};
        }

		let body = {
            email: email,
            password: password,
            sessionKey: sessionKey
        };
        
		return this.$http.post(this.baseUri + `/user/login`, body)
            .toPromise()
            .then(getPackageSuccess)
            .catch(this.errorHandler);
    }

    registerCustomer = (firstname: string, lastname: string, email:string) => {
        const registerUserObjectSuccess = (response: any): Promise<responseObject> => {            
            return response || {};
        }

        let body = {
            firstname: firstname, 
            lastname: lastname, 
            email:email, 
            userType: "1"
        };

        return this.$http.post(this.baseUri + `/user/create`, body)
            .toPromise()
            .then(registerUserObjectSuccess)
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

    updateAddressObject = (id: string, address:string, city:string, country:string, zipcode:string) => {
        const signupUserObjectSuccess = (response: any): Promise<responseObject> => {            
            return response || {};
        }
        let body = {
            id:id,
            address:address,
            city:city,
            country:country,
            zipcode:zipcode

        };

        return this.$http.post(this.baseUri + `/user/update-address`,body)
            .toPromise()
            .then(signupUserObjectSuccess)
            .catch(this.errorHandler);
    }

    updateCreditObject = (id: string, creditcardnumber: string, creditcardtype: string, cardexp: string) => {
        const updateUserObjectSuccess = (response: any): Promise<responseObject> => {            
            return response || {};
        }
        
        var temp = cardexp.split("-");
        var cardexpmonth, cardexpyear;
        if(temp.length == 2){
            cardexpyear = temp[0];
            cardexpmonth = temp[1];
        }
        else{
            cardexpmonth = cardexp;
            cardexpyear = cardexp;
        }

        let body = {
            id:id,
            creditcardnumber:creditcardnumber,
            creditcardtype:creditcardtype,
            cardexpmonth:cardexpmonth,
            cardexpyear:cardexpyear

        };

        return this.$http.post(this.baseUri + `/user/update-credit`,body)
            .toPromise()
            .then(updateUserObjectSuccess)
            .catch(this.errorHandler);
    }

    clearItems() {
        this.user = {
            name: null,
            userid: null,
            address: null,
            creditcard: null,
            sessionKey: null,
            userType: null
        }
        this.saveUser()
        this.persistenceService.remove(this.userName,StorageType.SESSION);
    }

    private errorHandler = (error: any): Promise<any> =>{
        let errMsg: string;
        errMsg = error.message ? error.message : error.text();
        return Promise.reject(errMsg);
    }
}
