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

    getCartsByCustomer =  (req: any, res: any) => {
        const uri = this.baseEndpoint + '/orders/get/user?userid='+req.body.id;
        const body = { };
        const requestOpt = this.http.createOption(uri, body);
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
        const requestOpt = this.http.createOption(uri, {});
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

    saveCart = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/order/create';
        console.log(req.body);
        const body = {
            "userid": req.body.userid,
            "totalprice": req.body.totalprice,
            "deliverymethod": req.body.deliverymethod,
            "orderdetails":req.body.orderdetails,
            "orderdate": req.body.orderdate
        };
        const requestOpt = this.http.createOption(uri, body);

        const saveCartSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(saveCartSuccess)
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
