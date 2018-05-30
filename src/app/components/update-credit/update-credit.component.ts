import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import { countries, regions } from "typed-countries";
import * as _ from "lodash";

@Component({
    selector: "#update-credit",
    templateUrl: "./update-credit.component.html",
    styleUrls: ["./update-credit.style.css"]
})

export class UpdateCreditComponent implements OnInit {
    // private fields
    model: any = {};
    loading: boolean;
    notifyMessages: INotifyMessage[];
    creditTypeSelected: string;
    id: string ;
    
    ngOnInit() {

        this.loading = false;
        this.notifyMessages = [];
        this.id = this.userSvc.user.userid;
    }

    constructor(private router: Router,
        private userSvc: UserService,
        private route: ActivatedRoute
        ){
    }

    updateCreditObject() {
        this.loading = true;
        const failToUpdateObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.userSvc.updateCreditObject(this.id, this.model.cardnumber, this.creditTypeSelected, this.model.exp)
            .then((result) => {
                this.loading = false;
                this.notifyMessages.push({ type: "confirm", message: "Successful update credit!! use "+ result.email +" as username"  });
                if(result.data){
                    var userObject = result.data;
                    this.userSvc.addItem(userObject.name,userObject.id,userObject.address,userObject.creditcardtype, null, userObject.userType);
                }
            }, failToUpdateObjects);
                
    }
}
