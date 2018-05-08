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
        const requestOpt = this.http.createOption(uri, body);

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

    private errorHandler(error: any) {
        console.log(error);
    }
}

export default new UserService();