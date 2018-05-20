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
    
    constructor(
        private router: Router,
        private userSvc: UserService) { }
 
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        // reset register status
        // don't know how
 
        // get return url from route parameters or default to '/'
        // kill me?
    }

    registerObject(){
        
        const failToRegisterObjects = (error: any) => {
        this.loading = false;
        this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        
        this.userSvc.registerCustomer(this.model.firstname, this.model.lastname, this.model.email)
            .then((result) => {
                this.loading = true;
                this.notifyMessages.push({ type: "confirm", message: "Successful register a customer!! use "+ result.email +" as username"  });
                if(result.data){
                    var userObject = result.data;
                    console.log("moving to updateCustomerAddress");
                    this.userSvc.addItem(userObject.id);
                    this.router.navigate(["/update-address", userObject]);
                }
            }, failToRegisterObjects);
    }
}