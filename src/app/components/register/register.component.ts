import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";

import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
import { countries, regions } from "typed-countries";
import * as md5 from 'md5';

@Component({
    selector: "#register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.style.css"]
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    notifyMessages: INotifyMessage[];
    isValid: boolean;
    
    constructor(
        private router: Router,
        private userSvc: UserService) { }
 
    ngOnInit() {
        this.loading = false;
        this.notifyMessages = [];
        this.isValid = false;
        // reset register status
        // don't know how
 
        // get return url from route parameters or default to '/'
        // kill me?
    }

    onSubmit(f: any) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
    }

    registerObject(isValid: any){
        if(isValid.valid) {
            this.loading = true;
            const failToRegisterObjects = (error: any) => {
            this.loading = false;

            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
            };
            
            this.userSvc.registerCustomer(this.model.firstname, this.model.lastname, this.model.email)
                .then((result) => {
                    this.loading = false;
                    if(result.data.status="success"){
                        var userObject = result.data;
                        this.notifyMessages.push({ type: "confirm", message: "Successful register a customer!! use "+ result.email +" as username"  });
                        this.userSvc.addItem(userObject.name,userObject.id,userObject.address,userObject.creditcardtype, null, userObject.userType);
                    }
                }, failToRegisterObjects);
        }
        else {
            this.notifyMessages.push({ type: "error", message: "invalid"  });
        }
    }
}