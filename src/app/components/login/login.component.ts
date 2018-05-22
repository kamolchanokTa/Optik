import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";

import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
import { countries, regions } from "typed-countries";
import * as md5 from 'md5';

@Component({
    selector: "#login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.style.css"]
})

export class LoginComponent implements OnInit {
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
        // reset login status
        // don't know how
 
        // get return url from route parameters or default to '/'
        // kill me?
    }
	
	loginObject(){
		const failToLoginObjects = (error: any) => {
		    this.loading = false;
		    this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
		
		this.userSvc.login(this.model.email, md5(this.model.password))
            .then((result) => {
                this.loading = true;
                this.userSvc.addItem(result.name,result.id,result.address,result.creditcardtype);
                this.notifyMessages.push({ type: "confirm", message: "Successful login!! use "+ result.email +" as username"  });
            }, failToLoginObjects);
	}
}