import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import { countries, regions } from "typed-countries";
import * as _ from "lodash";

@Component({
    selector: "#update-address",
    templateUrl: "./update-address.component.html",
    styleUrls: ["./update-address.style.css"]
})

export class UpdateAddressComponent implements OnInit {
    // private fields
    model: any = {};
    loading: boolean;
    notifyMessages: INotifyMessage[];
    countryList: any;
    countrySelected: string;
    id: string = this.route.snapshot.params['id'];
    
    ngOnInit() {

        this.loading = true;
        this.notifyMessages = [];
        this.countryList = countries;
    }

    constructor(private router: Router,
        private userSvc: UserService,
        private route: ActivatedRoute
        ){
    }

    updateAddressObject() {
        this.loading = true;
        const failToUpdateObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.userSvc.updateAddressObject(this.id, this.model.address, this.model.city, this.countrySelected, this.model.zipcode)
            .then((result) => {
                this.loading = true;
                debugger;
                this.notifyMessages.push({ type: "confirm", message: "Successful update address!! use "+ result.id +" as username"  });
                if(result.data){
                    var userObject = result.data;
                    console.log("moving to credit page");
                    this.router.navigate(["/update-credit", userObject]);
                }
            }, failToUpdateObjects);
                
    }
}
