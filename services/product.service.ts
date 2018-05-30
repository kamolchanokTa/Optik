import * as async from 'async';
import { ServiceHandler } from './service-handler';

const appJson = require('../app.json');


class ProductService {
    http: ServiceHandler;
    baseEndpoint: string;

    constructor() {
        this.http = new ServiceHandler(appJson.appId);
        this.baseEndpoint = 'http://localhost:8080';
    }

    getListOfProductOverview = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/productoverview';
        const body = { };
        const requestOpt = this.http.createOption(uri, body, null);

        const getPermissionObjectSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(getPermissionObjectSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    getProducts =  (req: any, res: any) => {
        const uri = this.baseEndpoint + '/products';
        const body = { };
        const requestOpt = this.http.createOption(uri, body, null);
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

    getProduct =  (req: any, res: any) => {
        console.log(req.body);
        const uri = this.baseEndpoint + '/product?id='+req.body.id;
        
        // const body = { };
        const requestOpt = this.http.createOption(uri, {}, null);
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

    saveProduct = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/product/create';
        console.log(req.body);
        const body = {
            "name": req.body.name,
            "productType": req.body.productType,
            "image": req.body.image,
            "price":req.body.price,
            "description": req.body.description,
            "userid": req.body.userid,
            "amount": req.body.amount
        };
        const requestOpt = this.http.createOption(uri, body,req.body.sessionKey);

        const saveProductSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(saveProductSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
    }

    private errorHandler(error: any) {
        console.log(error);
    }
}

export default new ProductService();
