import * as async from 'async';
import { ServiceHandler } from './service-handler';

const appJson = require('../app.json');


class UserService {
    http: ServiceHandler;
    baseEndpoint: string;

    constructor() {
        this.http = new ServiceHandler(appJson.appId);
        this.baseEndpoint = 'http://localhost:8080';
    }

    create = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user/create';
        const body = {
            "email": req.body.email,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "dob": req.body.dob,
            "address": req.body.address,
            "city": req.body.city,
            "country":req.body.country,
            "zipcode": req.body.zipcode,
            "userType": req.body.userType,
            "password": req.body.password
        };

        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const createUserSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(createUserSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    createUser = (req: any, res: any) => {
        console.log(req.body.email);
        const uri = this.baseEndpoint + '/user/create';
        const body = {
            "email": req.body.email,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "userType": req.body.userType,
        };
        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const createUserSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(createUserSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    getUserByID = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user?userid='+req.query.id;
        const requestOpt = this.http.createOption(uri, {}, req.body.sessionKey);

        const updateSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.getAsync(requestOpt)
            .then(updateSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    updateAddress = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user/update/address';
        const body = {
            "id": req.body.id,
            "address": req.body.address,
            "city": req.body.city,
            "country":req.body.country,
            "zipcode": req.body.zipcode,
        };
        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const updateSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(updateSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

        updateCredit = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user/update/credit';
        const body = {
            "id": req.body.id,
            "creditcardnumber": req.body.creditcardnumber,
            "creditcardtype": req.body.creditcardtype,
            "cardexpmonth": req.body.cardexpmonth,
            "cardexpyear":req.body.cardexpyear
        };
        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const updateSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(updateSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    private errorHandler(error: any) {
        console.log(error);
    }

    login = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user/login';
        const body = {
            "email": req.body.email,
            "password": req.body.password,
        };
        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const loginUserSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(loginUserSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    logout =  (req: any, res: any) => {
        const uri = this.baseEndpoint + '/user/logout';
        
        // const body = { };
        const requestOpt = this.http.createOption(uri, {},req.body.sessionKey);
        const getvalueSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.getAsync(requestOpt)
            .then(getvalueSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }
}

export default new UserService();