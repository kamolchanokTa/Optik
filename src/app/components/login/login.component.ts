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
    templateUrl: "./login.component.html"
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
        this.loading = false;
        this.notifyMessages = [];
    }
	
	loginObject(valid: boolean){
        if(valid) {
            const failToLoginObjects = (error: any) => {
                this.loading = false;
                this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
            };
            let sessionKey = null;
            if(this.userSvc.user.sessionKey != null){
                sessionKey = this.userSvc.user.sessionKey;
            }
            this.userSvc.login(this.model.email, md5(this.model.password), sessionKey)
                .then((result) => {
                    if(result.data){
                        this.loading = false;
                        this.userSvc.addItem(result.data.user.name,result.data.user.id,result.data.user.address,result.data.user.creditcardtype, result.data.usersessionKey, result.data.user.userType);
                        this.notifyMessages.push({ type: "confirm", message: "Successful login!! use "+ result.data.user.email +" as username"  });
                    }
                    else {
                        this.loading = false;
                        this.notifyMessages.push({ type: "error", message: result.data.message || result.data.user|| "Internal server error"  });
                    } 
    
                }, failToLoginObjects);
        }
		else {
            this.notifyMessages.push({ type: "error", message: "Invalid"  });
        }
	}
}