import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
import { countries, regions } from "typed-countries";
import * as md5 from 'md5';

@Component({
    selector: "#user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.css"]
})

export class LoadUserComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
	notifyMessages: INotifyMessage[];
	userObj : any= {};
	
    constructor(
        private router: Router,
        private userSvc: UserService) { }
 
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        this.userObj = [];
        this.loadUserObject();
    }
	
	loadUserObject(){
		const failToUserObjects = (error: any) => {
		    this.loading = false;
		    this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
		this.userObj = this.userSvc.loadUser();
	}
}