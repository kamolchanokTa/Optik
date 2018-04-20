import * as async from 'async';
import { ServiceHandler } from './service-handler';

const appJson = require('../app.json');


class ProductService {
    http: ServiceHandler;
    baseEndpoint: string;

    constructor() {
        this.http = new ServiceHandler(appJson.appId);
        this.baseEndpoint = 'http://localhost:5000/api';
    }

    getListOfProductOverview = (req: any, res: any) => {
        const uri = this.baseEndpoint + '/productoverview';
        const body = { };
        const requestOpt = this.http.createOption(uri, body);

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

    getValues =  (req: any, res: any) => {
        const uri = this.baseEndpoint + '/values';
        const body = { };
        const requestOpt = this.http.createOption(uri, body);
        console.log("get values!!");
        const getvalueSuccess = (data: any) => {
            res.send(200, data);
        };

        this.http.postAsync(requestOpt)
            .then(getvalueSuccess)
            .catch((error) => {
                this.errorHandler(error);
                res.send(error.code || 500, error.message || "Internal server error");
            });
        // console.log("sd");
        // var data = ['vales1','values2'];
        // res.send(200, data);
    }

    private errorHandler(error: any) {
        console.log(error);
    }
}

export default new ProductService();
