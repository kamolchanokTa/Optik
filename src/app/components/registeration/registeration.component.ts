import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";

import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
import { countries, regions } from "typed-countries";
import * as md5 from 'md5';

@Component({
    selector: "#registeration",
    templateUrl: "./registeration.component.html",
    styleUrls: ["./registeration.style.css"]
})

export class RegisterationComponent implements OnInit {
    // private fields
    valueList: any;
    loading: boolean;
    notifyMessages: INotifyMessage[];
    countryList: any;
    // User registeration parameters
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmedpassword: string;
    address: string
    city: string
    countrySelected: string;
    zipcode: string;
    dob: string;
    ngOnInit() {
        this.loading = false;
        this.notifyMessages = [];
        debugger;
        this.countryList = countries;
    }

    constructor(private router: Router,
        private userSvc: UserService
        ){
    }

    registerObject() {
        this.loading = true;
        let userObject: UserObject = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: md5(this.password),
            address: this.address,
            city:this.city,
            country: this.countrySelected,
            zipcode: this.zipcode,
            userType: "2",
            dob: this.dob
        }
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.userSvc.signupUserObject(userObject)
            .then((result) => {
                this.loading = false;
                this.notifyMessages.push({ type: "confirm", message: "Successful register!! use "+ result.email +" as username"  });
            }, failToSaveObjects);
                
    }
}